import { type UserUpdateDTO, type UserCreateDTO } from './dto/user.dtos';
import { UserRepository } from './user.repository';
import { validate } from 'class-validator';
import { extractErrorKeysFromErrors } from '../utils/functions';
import { StatusCodes } from 'http-status-codes';
import { RESULT_OK, type IResult, NOT_FOUND } from '../utils/interfaces/result.interface';
import bcrypt from 'bcrypt';
import { type User } from './user.entity';
import { unsupportedNameChars } from '../utils/regular-expressions';
import { Not } from 'typeorm';

const userRepository = new UserRepository();

export class UserService {
  async create (userCreateDTO: UserCreateDTO): Promise<IResult> {
    const errors = await validate(userCreateDTO);

    if (errors.length > 0) {
      const errorKeys = extractErrorKeysFromErrors(errors);

      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `Hubo un error de validación al actualizar el usuario: ${errors}.`,
        entity: null,
        resultKeys: errorKeys
      };
    }

    const userFound = await userRepository.findOneBy({ email: userCreateDTO.email });

    if (userFound !== null) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'El email ya se encuentra registrado.',
        entity: null,
        resultKeys: ['email-already-registered']
      };
    }

    if (userCreateDTO.firstName.match(unsupportedNameChars) === null) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'El nombre no puede contener caracteres especiales.',
        entity: null,
        resultKeys: ['firstname-unsupported-characters']
      };
    }

    if (userCreateDTO.lastName.match(unsupportedNameChars) === null) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'El apellido no puede contener caracteres especiales.',
        entity: null,
        resultKeys: ['lastname-unsupported-characters']
      };
    }

    if (userCreateDTO.password !== userCreateDTO.confirmPassword) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Las contraseñas no coinciden, por favor intente de nuevo.',
        entity: null,
        resultKeys: ['password-not-match']
      };
    }

    if (userCreateDTO.email !== userCreateDTO.confirmEmail) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Hubo un error al confirmar el email, por favor intente de nuevo.',
        entity: null,
        resultKeys: ['email-not-match']
      };
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(userCreateDTO.password, salt);
    const { confirmEmail, confirmPassword, ...userToCreate } = userCreateDTO;

    const userCreated = await userRepository.save({ ...userToCreate, password });

    return {
      statusCode: StatusCodes.OK,
      message: 'Usuario creado con éxito!.',
      entity: userCreated,
      resultKeys: [RESULT_OK]
    };
  }

  async find (): Promise<User[]> {
    return await userRepository.find();
  }

  async findOneById (id: number): Promise<IResult> {
    const currentUser = await userRepository.findOneBy({ id });

    if (currentUser === null) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: `No se encontró un usuario con el ID: ${id}.`,
        entity: null,
        resultKeys: [NOT_FOUND]
      };
    }

    return {
      statusCode: StatusCodes.OK,
      message: `Usuario con ID ${id} encontrado.`,
      entity: currentUser,
      resultKeys: [RESULT_OK]
    };
  }

  async update (id: number, userUpdateDTO: UserUpdateDTO): Promise<IResult> {
    const errors = await validate(userUpdateDTO);

    if (errors.length > 0) {
      const errorKeys = extractErrorKeysFromErrors(errors);

      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `Hubo un error de validación al actualizar el usuario: ${errors}.`,
        entity: null,
        resultKeys: errorKeys
      };
    }

    const currentUser = await userRepository.findOneBy({ id });

    if (currentUser === null) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: `No se encontró un usuario con el ID: ${id}.`,
        entity: null,
        resultKeys: [NOT_FOUND]
      };
    }

    if (userUpdateDTO.email === undefined && userUpdateDTO.confirmEmail !== undefined) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Para actualizar el email, por favor introduzca uno nuevo.',
        entity: null,
        resultKeys: ['email-empty']
      };
    }

    if (userUpdateDTO.email !== undefined && userUpdateDTO.confirmEmail === undefined) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'La confirmación de email es requerida.',
        entity: null,
        resultKeys: ['confirm-email-empty']
      };
    }

    if (userUpdateDTO.email !== undefined && userUpdateDTO.email !== null) {
      const isEmailRegistered = await userRepository.findOneBy({ email: userUpdateDTO.email, id: Not(currentUser.id) });
      if (isEmailRegistered !== null) {
        return {
          statusCode: StatusCodes.BAD_REQUEST,
          message: 'El email ya se encuentra en uso.',
          entity: null,
          resultKeys: ['email-already-in-use']
        };
      }
    }

    if (userUpdateDTO.email !== undefined && userUpdateDTO.email !== userUpdateDTO.confirmEmail) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Hubo un error al confirmar el email, por favor intente de nuevo.',
        entity: null,
        resultKeys: ['email-not-match']
      };
    }

    if (userUpdateDTO.oldPassword === undefined && (userUpdateDTO.password !== undefined || userUpdateDTO.confirmPassword !== undefined)) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Para cambiar la contraseña, por favor ingrese la contraseña actual.',
        entity: null,
        resultKeys: ['empty-current-password']
      };
    }

    if (userUpdateDTO.oldPassword !== undefined) {
      const isPasswordCorrect = await bcrypt.compare(userUpdateDTO.oldPassword, currentUser.password);
      if (!isPasswordCorrect) {
        return {
          statusCode: StatusCodes.BAD_REQUEST,
          message: 'Contraseña actual incorrecta, intente de nuevo.',
          entity: null,
          resultKeys: ['incorrect-current-password']
        };
      }
      if (userUpdateDTO.password === undefined || userUpdateDTO.password === null) {
        return {
          statusCode: StatusCodes.BAD_REQUEST,
          message: 'No se proporcionó ninguna contraseña nueva para cambiar la actual, intente de nuevo.',
          entity: null,
          resultKeys: ['new-password-not-provided']
        };
      }
      if (userUpdateDTO.confirmPassword !== userUpdateDTO.password) {
        return {
          statusCode: StatusCodes.BAD_REQUEST,
          message: 'Las contraseñas no coinciden, por favor intente de nuevo.',
          entity: null,
          resultKeys: ['password-not-match']
        };
      }

      const salt = await bcrypt.genSalt(10);
      userUpdateDTO.password = await bcrypt.hash(userUpdateDTO.password, salt);
    }

    const { confirmEmail, confirmPassword, oldPassword, ...userToUpdate } = userUpdateDTO;
    await userRepository.update(currentUser.id, userToUpdate);
    const updatedUser = await userRepository.findOneBy({ id });

    return {
      statusCode: StatusCodes.OK,
      message: 'Los datos del usuario han sido actualizados con éxito.',
      entity: updatedUser,
      resultKeys: [RESULT_OK]
    };
  }

  async delete (id: number): Promise<IResult> {
    const userToDelete = await userRepository.findOneBy({ id });

    if (userToDelete === null) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: `No se encontró un usuario con el ID: ${id}.`,
        entity: null,
        resultKeys: [NOT_FOUND]
      };
    }

    await userRepository.update(id, { deletedAt: new Date() });

    return {
      statusCode: StatusCodes.OK,
      message: `El usuario con ID ${id} fue eliminado con éxito.`,
      entity: null,
      resultKeys: [RESULT_OK]
    };
  }
}
