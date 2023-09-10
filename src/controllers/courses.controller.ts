/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Request, type Response } from 'express';
import { CoursesService } from '../services/courses.service';
import { StatusCodes } from 'http-status-codes';
import { plainToInstance } from 'class-transformer';
import { CreateCourseDTO } from '../dtos/create-course.dto';
import { parseID } from '../utils/functions';

const service = new CoursesService();

export class CoursesController {
  async createCourse (req: Request, res: Response): Promise<void> {
    try {
      const courseInstance = plainToInstance(CreateCourseDTO, req.body);

      const course = await service.createCourse(courseInstance);

      res.status(StatusCodes.OK).json({
        message: 'Se agregó exitosamente el nuevo curso.',
        entity: course
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
        data: courses
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  async findCourse (req: Request, res: Response): Promise<void> {
    const id = parseID(req.query.id?.toString());
    const course = await service.findCourse(id);

    res.status(StatusCodes.OK).json({
      message: `Curso ID: ${id}`,
      data: course
    });
  }

  async updateCourse (_req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.NOT_IMPLEMENTED).send('Este endpoint aún no está disponible.');
  }

  async deleteCourse (_req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.NOT_IMPLEMENTED).send('Este endpoint aún no está disponible.');
  }
}
