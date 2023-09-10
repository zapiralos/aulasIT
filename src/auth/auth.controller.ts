import { type Request, type Response } from 'express';
import { UserRepository } from '../users/user.repository';
import { AuthService } from './auth.service';
import { StatusCodes } from 'http-status-codes';
import { plainToInstance } from 'class-transformer';
import { LoginDTO } from './dto/login.dtos';

export const userRepository = new UserRepository();
const authService = new AuthService();

export class AuthController {
  async login (req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (email === undefined || password === undefined) {
        res.status(StatusCodes.BAD_REQUEST).send('Por favor, ingrese su email y contraseña.');
      }

      const userLoginData = plainToInstance(LoginDTO, req.body);
      const result = await authService.login(userLoginData);

      res
        .status(StatusCodes.OK)
        .json({
          message: result.message,
          data: { token: result.token, result: result.entity },
          resultKeys: result.resultKeys
        });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error de servidor: ${error}`);
    }
  }
}
