import { validate } from 'class-validator';
import { CoursesRepository } from '../repositories/courses.repository';
import { type Course } from '../entities/course.entity';
import { type CreateCourseDTO } from '../dtos/create-course.dto';
import { type IResult } from '../utils/interfaces/result.interface';

const repository = new CoursesRepository();

interface FindOptions {
  withDeleted: boolean
}

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

  async findCourse (id: number, options?: FindOptions): Promise<Partial<IResult>> {
    const [course] = await repository.find({
      where: { id },
      withDeleted: options?.withDeleted ?? false
    });

    if (!course) {
      return {
        message: `No se encontró un curso con el identificador: ${id}`,
        entity: null
      };
    }

    return {
      message: `Se encontró correctamente el curso con el identificador: ${id}`,
      entity: course
    };
  }

  async updateCourse (id: number, attrs: Partial<Course>): Promise<Partial<IResult>> {
    const { entity: course } = await this.findCourse(id);

    if (!course) {
      return {
        message: `No se encontró el curso con el identificador: ${id}`,
        entity: null
      };
    }

    Object.assign(course, attrs);

    return {
      message: `Se actualizaron correctamente los datos del curso con el identificador: ${id}`,
      entity: course
    };
  }

  async deleteCourse (id: number): Promise<Partial<IResult>> {
    const result = await repository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: `No se pudo borrar el curso con el identificador: ${id}`,
        entity: null
      };
    }

    return {
      message: `Se eliminó correctamente el curso con el identificador: ${id}`,
      entity: null
    };
  }

  async restoreCourse (id: number): Promise<Partial<IResult>> {
    const result = await repository.restore(id);

    if (result.affected === 0) {
      return {
        message: `No se pudo restaurar el curso con el identificador: ${id}`,
        entity: null
      };
    }

    return {
      message: `Se restauró correctamente el curso con el identificador: ${id}`,
      entity: null
    };
  }
}
