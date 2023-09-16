import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { plainToInstance } from 'class-transformer';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dto/create-category.dto';

const service = new CategoriesService();

export class CategoriesController {
  async create (req: Request, res: Response): Promise<void> {
    try {
      const instance = plainToInstance(CreateCategoryDTO, req.body);
      const category = await service.findByNameWithoutValidation(instance.name);
      const exists = category !== null;

      if (exists) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: `La categoría ${category.name} ya existe.`,
          entity: category
        });

        return;
      }

      res.status(StatusCodes.CREATED).json(await service.create(instance));
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  async list (_req: Request, res: Response): Promise<void> {
    try {
      res.status(StatusCodes.OK).json(await service.list());
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  async find (req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.query.id);
      const { message, entity } = await service.findById(id);

      if (!entity) {
        res.status(StatusCodes.NOT_FOUND).send(message);
      }

      res.status(StatusCodes.OK).json({
        message,
        entity
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  async update (req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.query.id);
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
      const id = Number(req.query.id);
      const { statusCode, message } = await service.delete(id);

      if (statusCode === 404) {
        res.status(StatusCodes.NOT_FOUND).send(message);
        return;
      }

      res.status(StatusCodes.OK).send(message);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  async restore (req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.query.id);
      const result = await service.restore(id);

      res.status(StatusCodes.OK).send(result.message);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }
}
