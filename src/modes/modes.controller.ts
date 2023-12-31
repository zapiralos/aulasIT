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
      const mode = await service.findByNameWithoutValidation(instance.name);
      const exists = mode !== null;
      const isDeleted = !!mode?.deletedAt;

      if (isDeleted) {
        const { message, entity } = await service.restore(mode.id);

        res.status(StatusCodes.CREATED).json({
          message,
          entity
        });
        return;
      }

      if (exists) {
        res.status(StatusCodes.BAD_REQUEST).send(`La modalidad "${mode.name}" ya existe.`);
        return;
      }

      const { message, entity } = await service.create(instance);

      if (!entity) {
        res.status(StatusCodes.BAD_REQUEST).send(message);
      }

      res.status(StatusCodes.CREATED).json({
        message,
        entity
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`${MessagesCodes.INTERNAL_SERVER_ERROR} ${error}`);
    }
  }

  async find (req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.query.id);
      const { message, entity } = await service.findById(id);

      if (!entity) {
        res.status(StatusCodes.NOT_FOUND).send(message);
        return;
      }

      res.status(StatusCodes.OK).json({
        message,
        entity
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`${MessagesCodes.INTERNAL_SERVER_ERROR} ${error}`);
    }
  }

  async list (req: Request, res: Response): Promise<void> {
    try {
      const { message, entities: modes } = await service.list();

      res.status(StatusCodes.OK).json({
        message,
        count: modes?.length,
        data: modes
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`${MessagesCodes.INTERNAL_SERVER_ERROR} ${error}`);
    }
  }

  async update (req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.query.id);
      const { message, entity } = await service.update(id, req.body);

      res.status(StatusCodes.CREATED).json({
        message,
        entity
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`${MessagesCodes.INTERNAL_SERVER_ERROR} ${error}`);
    }
  }

  async delete (req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.query.id);
      const { statusCode, message } = await service.delete(id);

      if (statusCode === 404) {
        res.status(StatusCodes.NOT_FOUND).send(message);
        return;
      }

      res.status(StatusCodes.OK).send(message);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`${MessagesCodes.INTERNAL_SERVER_ERROR} ${error}`);
    }
  }

  async restore (req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.query.id);
      const result = await service.restore(id);

      res.status(StatusCodes.OK).send(result.message);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`${MessagesCodes.INTERNAL_SERVER_ERROR} ${error}`);
    }
  }
}
