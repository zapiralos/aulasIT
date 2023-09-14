import { Request, Response } from 'express';
import { ModesService } from './modes.service';
import { CreateModeDTO } from './dto/create-mode.dto';
import { plainToInstance } from 'class-transformer';
import { StatusCodes } from 'http-status-codes';
import { MessagesCodes } from '../utils/messages-codes';

const service = new ModesService();

export class ModesController {
  async create (req: Request, res: Response): Promise<void> {
    try {
      const instance = plainToInstance(CreateModeDTO, req.body);
      const result = await service.create(instance);

      if (!result.entity) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: result.message,
          entity: result.entity
        });
      }

      res.status(StatusCodes.CREATED).json({
        message: result.message,
        entity: result.entity
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`${MessagesCodes.INTERNAL_SERVER_ERROR} ${error}`);
    }
  }

  async find (req: Request, res: Response): Promise<void> {
    try {
      res.status(StatusCodes.NOT_IMPLEMENTED).send(MessagesCodes.NOT_IMPLEMENTED);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`${MessagesCodes.INTERNAL_SERVER_ERROR} ${error}`);
    }
  }

  async list (req: Request, res: Response): Promise<void> {
    try {
      res.status(StatusCodes.NOT_IMPLEMENTED).send(MessagesCodes.NOT_IMPLEMENTED);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`${MessagesCodes.INTERNAL_SERVER_ERROR} ${error}`);
    }
  }

  async update (req: Request, res: Response): Promise<void> {
    try {
      res.status(StatusCodes.NOT_IMPLEMENTED).send(MessagesCodes.NOT_IMPLEMENTED);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`${MessagesCodes.INTERNAL_SERVER_ERROR} ${error}`);
    }
  }

  async delete (req: Request, res: Response): Promise<void> {
    try {
      res.status(StatusCodes.NOT_IMPLEMENTED).send(MessagesCodes.NOT_IMPLEMENTED);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`${MessagesCodes.INTERNAL_SERVER_ERROR} ${error}`);
    }
  }

  async restore (req: Request, res: Response): Promise<void> {
    try {
      res.status(StatusCodes.NOT_IMPLEMENTED).send(MessagesCodes.NOT_IMPLEMENTED);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`${MessagesCodes.INTERNAL_SERVER_ERROR} ${error}`);
    }
  }
}
