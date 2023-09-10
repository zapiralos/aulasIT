import { type Request, type Response } from 'express';
import { CoursesService } from '../services/courses.service';
import { StatusCodes } from 'http-status-codes';

const service = new CoursesService();

export class CoursesController {
  async listCourses (req: Request, res: Response): Promise<void> {
    try {
      const courses = await service.listCourses();

      res.status(StatusCodes.OK).json({
        data: courses
      });
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND);
    }
  }
}
