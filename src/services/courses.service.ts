import { type Course } from '../entities/course.entity';
import { CoursesRepository } from '../repositories/courses.repository';
import { IResult } from '../utils/interfaces/result.interface';

const repository = new CoursesRepository();

export class CoursesService {
  async listCourses (): Promise<IResult> {
    const courses = await repository.find();

    return courses;
  }
}
