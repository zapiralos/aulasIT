import { validate } from 'class-validator';
import { CoursesRepository } from '../repositories/courses.repository';
import { type Course } from '../entities/course.entity';
import { type CreateCourseDTO } from '../dtos/create-course.dto';

const repository = new CoursesRepository();

export class CoursesService {
  async createCourse (courseData: CreateCourseDTO): Promise<Course> {
    const errors = await validate(courseData);

    if (errors.length > 0) {
      throw new Error(`No se pudo agregar el curso debido a: ${errors}`);
    }

    const course = repository.create(courseData);

    return await repository.save(course);
  }

  async listCourses (): Promise<Course[]> {
    return await repository.find();
  }
}
