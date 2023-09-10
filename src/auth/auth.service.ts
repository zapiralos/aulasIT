import { validate } from 'class-validator';
import { type LoginDTO } from './dto/login.dtos';
import { UserRepository } from '../users/user.repository';
import { type ILoginDataResult, NOT_FOUND, RESULT_OK } from '../utils/interfaces/result.interface';
import { extractErrorKeysFromErrors } from '../utils/functions';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userRepository = new UserRepository();

export class AuthService {
  async login (user: LoginDTO): Promise<ILoginDataResult> {
    const errors = await validate(user);

    if (errors.length > 0) {
      const errorKeys = extractErrorKeysFromErrors(errors);

      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `Hubo un error al iniciar sesión: ${errors}`,
        token: null,
        entity: null,
        resultKeys: errorKeys
      };
    }

    const currentUser = await userRepository.findOneBy({ email: user.email });

    if (currentUser === null) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Usuario o contraseña incorrecto!',
        token: null,
        entity: null,
        resultKeys: [NOT_FOUND]
      };
    }

    const isPasswordCorrect = await bcrypt.compare(user.password, currentUser.password);

    if (!isPasswordCorrect) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Usuario o contraseña incorrecto!',
        token: null,
        entity: null,
        resultKeys: [NOT_FOUND]
      };
    }

    const token = jwt.sign({ userId: currentUser.id }, process.env.JWT_SECRET as string);

    return {
      statusCode: StatusCodes.OK,
      message: 'Se ha iniciado sesión exitosamente.',
      token,
      entity: currentUser,
      resultKeys: [RESULT_OK]
    };
  }
}
