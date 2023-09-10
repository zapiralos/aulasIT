import { validate } from 'class-validator';
import { CoursesRepository } from '../repositories/courses.repository';
import { type Course } from '../entities/course.entity';
import { type CreateCourseDTO } from '../dtos/create-course.dto';
import { type IResult } from '../utils/interfaces/result.interface';

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

  async findCourse (id: number): Promise<Partial<IResult>> {
    const [course] = await repository.find({
      where: { id }
    });

    if (!course) {
      return {
        message: `No se encontró un curso con el ID: ${id}`,
        entity: null
      };
    }

    return {
      message: `Se encontró correctamente el curso con el ID: ${id}`,
      entity: course
    };
  }

  async updateCourse (id: number, attrs: Partial<Course>): Promise<Partial<IResult>> {
    const { entity: course } = await this.findCourse(id);

    if (!course) {
      return {
        message: `No se encontró un curso con el ID: ${id}`,
        entity: null
      };
    }

    Object.assign(course, attrs);

    return {
      message: `Se actualizaron correctamente los datos del curso con el ID: ${id}`,
      entity: course
    };
  }
}
