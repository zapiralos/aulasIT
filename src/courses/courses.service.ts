import { validate } from 'class-validator';
import { CoursesRepository } from './courses.repository';
import { type Course } from './course.entity';
import { type IResult } from '../utils/interfaces/result.interface';
import { IFindOptions } from '../utils/interfaces/options.interface';

const repository = new CoursesRepository();

export class CoursesService {
  async createCourse (data: Partial<Course>): Promise<Partial<IResult>> {
    const errors = await validate(data);

    if (errors.length > 0) {
      return {
        message: `No se pudo agregar el curso debido a: ${errors}`,
        entity: null
      };
    }

    const instance = repository.create(data);
    const course = await repository.save(instance);

    return {
      message: `Se agregó correctamente el curso con el identificador: ${course.id}`,
      entity: course
    };
  }

  async listCourses (): Promise<Course[]> {
    return await repository.find({
      relations: {
        mode: true
      }
    });
  }

  async findCourse (id: number, options?: IFindOptions): Promise<Partial<IResult>> {
    const [course] = await repository.find({
      where: { id },
      withDeleted: options?.withDeleted ?? false,
      relations: { mode: true }
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
    const { entity: savedCourse } = await this.findCourse(id);

    if (!savedCourse) {
      return {
        message: `No se encontró el curso con el identificador: ${id}`,
        entity: null
      };
    }

    Object.assign(savedCourse, attrs);

    const course = await repository.save(savedCourse);

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
