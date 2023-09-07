import { type UserUpdateDTO, type UserCreateDTO } from '../dtos/user.dtos';
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

  async findOneById (id: number): Promise<IResult> {
    const currentUser = await userRepository.findOneBy({ id });

    if (currentUser === null) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: `No user found with ID: ${id}`,
        entity: null,
        resultKeys: ['not-found']
      };
    }

    return {
      statusCode: StatusCodes.OK,
      message: 'User found',
      entity: currentUser,
      resultKeys: ['ok']
    };
  }

  async update (id: number, userUpdateDTO: UserUpdateDTO): Promise<IResult> {
    const errors = await validate(userUpdateDTO);

    if (errors.length > 0) {
      const errorKeys = extractErrorKeysFromErrors(errors);

      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `Validation failed while updating user: ${errors}`,
        entity: null,
        resultKeys: errorKeys
      };
    }

    const currentUser = await userRepository.findOneBy({ id });

    if (currentUser === null) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: `No user found with ID: ${id}`,
        entity: null,
        resultKeys: ['not-found']
      };
    }

    const { confirmEmail, confirmPassword, oldPassword, ...userToUpdate } = userUpdateDTO;
    await userRepository.update(currentUser.id, userToUpdate);
    const updatedUser = await userRepository.findOneBy({ id });

    return {
      statusCode: StatusCodes.OK,
      message: `User ${updatedUser?.username} updated`,
      entity: updatedUser,
      resultKeys: ['ok']
    };
  }

  async delete (id: number): Promise<IResult> {
    const userToDelete = await userRepository.findOneBy({ id });

    if (userToDelete === null) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: `No user found with ID: ${id}`,
        entity: null,
        resultKeys: ['not-found']
      };
    }

    await userRepository.update(id, { deletedAt: new Date() });

    return {
      statusCode: StatusCodes.OK,
      message: `User with ID ${id} successfully deleted`,
      entity: null,
      resultKeys: ['ok']
    };
  }
}
