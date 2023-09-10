import { type Request, type Response } from 'express';
import { UserRepository } from './user.repository';
import { plainToInstance } from 'class-transformer';
import { UserCreateDTO, UserUpdateDTO } from './dto/user.dtos';
import { UserService } from './user.service';
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

  async getUser (req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const result = await userService.findOneById(id);

      res
        .status(StatusCodes.OK)
        .json({
          message: result.message,
          data: { result: result.entity },
          resultKeys: result.resultKeys
        });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  async updateUser (req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const userUpdate = plainToInstance(UserUpdateDTO, req.body);

      const result = await userService.update(id, userUpdate);

      res
        .status(StatusCodes.OK)
        .json({
          message: result.message,
          data: { result: result.entity },
          resultKeys: result.resultKeys
        });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  async deleteUser (req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      const result = await userService.delete(id);

      res
        .status(StatusCodes.OK)
        .json({
          message: result.message,
          data: { result: result.entity },
          resultKeys: result.resultKeys
        });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }
}
