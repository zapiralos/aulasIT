import { type UserUpdateDTO, type UserCreateDTO } from '../dtos/user.dtos';
import { UserRepository } from '../repositories/user.repository';
import { validate } from 'class-validator';
import { extractErrorKeysFromErrors } from '../utils/functions';
import { StatusCodes } from 'http-status-codes';
import { RESULT_OK, type IResult, NOT_FOUND } from '../utils/interfaces/result.interface';
import bcrypt from 'bcrypt';
import { type User } from '../entities/user.entity';

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
