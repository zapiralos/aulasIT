import { type Request, type Response } from 'express';
import { UserRepository } from '../repositories/user.repository';
import { plainToInstance } from 'class-transformer';
import { UserCreateDTO } from '../dtos/user.dtos';
import { UserService } from '../services/user.service';
import { StatusCodes } from 'http-status-codes';

export const userRepository = new UserRepository();
const userService = new UserService();

export class UserController {
  async createUser (req: Request, res: Response): Promise<void> {
    try {
      const userCreate = plainToInstance(UserCreateDTO, req.body);

      const result = await userService.create(userCreate);

      res
        .status(result.statusCode)
        .json({
          message: result.message,
          data: { result: result.entity },
          resultKeys: result.resultKeys
        });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  async getAllUsers (req: Request, res: Response): Promise<void> {
    try {
      const allUsers = await userService.find();

      res.status(StatusCodes.OK).json({ data: { result: allUsers, count: allUsers.length } });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }
}
