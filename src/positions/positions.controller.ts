import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { StatusCodes } from 'http-status-codes';
import { CreatePositionDTO } from './dto/create-position.dto';
import { PositionsService } from './positions.service';
import { parseNumber } from '../utils/functions';

const service = new PositionsService();

export class PositionsController {
  async create (req: Request, res: Response): Promise<void> {
    try {
      const instance = plainToInstance(CreatePositionDTO, req.body);
      const result = await service.create(instance);

      res.status(StatusCodes.CREATED).json({
        message: result.message,
        entity: result.entity
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  async find (req: Request, res: Response): Promise<void> {
    try {
      const id = parseNumber(req.query.id?.toString());
      const result = await service.find(id);

      if (!result.entity) {
        res.status(StatusCodes.NOT_FOUND).send(result.message);
        return;
      }

      res.status(StatusCodes.OK).json({
        message: result.message,
        entity: result.entity
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  async list (_req: Request, res: Response): Promise<void> {
    try {
      const result = await service.list();

      res.status(StatusCodes.OK).json({
        message: result.message,
        entities: result.entities
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  async update (req: Request, res: Response): Promise<void> {
    try {
      const id = parseNumber(req.query.id?.toString());
      const result = await service.update(id, req.body);

      res.status(StatusCodes.CREATED).json({
        message: result.message,
        entity: result.entity
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  async delete (req: Request, res: Response): Promise<void> {
    try {
      const id = parseNumber(req.query.id?.toString());
      const result = await service.delete(id);

      res.status(StatusCodes.OK).send(result.message);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  async restore (req: Request, res: Response): Promise<void> {
    try {
      const id = parseNumber(req.query.id?.toString());
      const result = await service.restore(id);

      res.status(StatusCodes.OK).send(result.message);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }
}
