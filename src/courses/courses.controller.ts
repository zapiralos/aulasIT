import { type Request, type Response } from 'express';
import { CoursesService } from './courses.service';
import { StatusCodes } from 'http-status-codes';
import { parseNumber } from '../utils/functions';
import { plainToInstance } from 'class-transformer';
import { CreateCourseDTO } from './dto/create-course.dto';

const service = new CoursesService();

export class CoursesController {
  async createCourse (req: Request, res: Response): Promise<void> {
    try {
      const instance = plainToInstance(CreateCourseDTO, req.body);
      const result = await service.createCourse(instance);

      res.status(StatusCodes.CREATED).json({
        message: result.message,
        entity: result.entity
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  async listCourses (_req: Request, res: Response): Promise<void> {
    try {
      const courses = await service.listCourses();

      res.status(StatusCodes.OK).json({
        message: 'Lista de cursos.',
        count: courses.length,
        data: courses
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  async findCourse (req: Request, res: Response): Promise<void> {
    try {
      const id = parseNumber(req.query.id?.toString());
      const result = await service.findCourse(id);

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

  async updateCourse (req: Request, res: Response): Promise<void> {
    try {
      const id = parseNumber(req.query.id?.toString());
      const result = await service.updateCourse(id, req.body);

      res.status(StatusCodes.CREATED).json({
        message: result.message,
        entity: result.entity
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  async deleteCourse (req: Request, res: Response): Promise<void> {
    try {
      const id = parseNumber(req.query.id?.toString());
      const result = await service.deleteCourse(id);

      res.status(StatusCodes.OK).send(result.message);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  async restoreCourse (req: Request, res: Response): Promise<void> {
    try {
      const id = parseNumber(req.query.id?.toString());
      const result = await service.restoreCourse(id);

      res.status(StatusCodes.OK).send(result.message);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }
}
