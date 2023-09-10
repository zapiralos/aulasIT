import { type Request, type Response } from 'express';
import { CoursesService } from '../services/courses.service';
import { StatusCodes } from 'http-status-codes';
import { plainToInstance } from 'class-transformer';
import { CreateCourseDTO } from '../dtos/create-course.dto';

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

  async findCourse (_req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.NOT_IMPLEMENTED).send('Este endpoint aún no está disponible.');
  }

  async updateCourse (_req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.NOT_IMPLEMENTED).send('Este endpoint aún no está disponible.');
  }

  async deleteCourse (_req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.NOT_IMPLEMENTED).send('Este endpoint aún no está disponible.');
  }
}
