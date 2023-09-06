import { type UserCreateDTO } from '../dtos/user.dtos';
import { UserRepository } from '../repositories/user.repository';
import { validate } from 'class-validator';
import { extractErrorKeysFromErrors } from '../utils/functions';
import { StatusCodes } from 'http-status-codes';
import { type IResult } from '../utils/interfaces/result.interface';
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
        message: `Validation failed while creating user: ${errors}`,
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
      message: 'User created successfully!',
      entity: userCreated,
      resultKeys: ['ok']
    };
  }

  async find (): Promise<User[]> {
    return await userRepository.find();
  }
}
