import { validate } from 'class-validator';
import { IResult } from '../utils/interfaces/result.interface';
import { CategoriesRepository } from './categories.repository';
import { Category } from './category.entity';
import { CreateCategoryDTO } from './dto/create-category.dto';

const repository = new CategoriesRepository();

export class CategoriesService {
  async create (data: Partial<Category>): Promise<Partial<IResult>> {
    const errors = await validate(data);

    if (errors.length > 0) {
      return {
        message: `No se pudo agregar la categoría debido a: ${errors}`,
        entity: null
      };
    }

    const instance = repository.create(data);
    const category = await repository.save(instance);

    return {
      message: `Se agregó correctamente la categoría ${category.name}`,
      entity: category
    };
  }

  async list (): Promise<Partial<IResult>> {
    return {
      message: 'Categorías guardadas',
      entities: await repository.find({
        relations: {
          courses: true
        }
      })
    };
  }

  async findById (id: number): Promise<Partial<IResult>> {
    const [category] = await repository.find({
      where: { id },
      relations: {
        courses: true
      }
    });

    if (!category) {
      return {
        message: `No se encontró la categoría con el identificador: ${id}`,
        entity: null
      };
    }

    return {
      message: `Se encontró la categoría con el identificador: ${id}`,
      entity: category
    };
  }

  async findByNameWithoutValidation (name: string): Promise<Category | null> {
    return await repository.findOneBy({ name });
  }

  async update (id: number, attrs: CreateCategoryDTO): Promise<Partial<IResult>> {
    const savedCategory = await repository.findOneBy({ id });

    if (!savedCategory) {
      return {
        message: `No se encontró la categoría con el identificador: ${id}`,
        entity: null
      };
    }

    Object.assign(savedCategory, attrs);

    const category = await repository.save(savedCategory);

    return {
      message: `Se actualizaron correctamente los datos del curso con el identificador: ${id}`,
      entity: category
    };
  }

  async delete (id: number): Promise<Partial<IResult>> {
    const category = await repository.find({ where: { id }, relations: { courses: true } });

    if (category.length === 0) {
      return {
        statusCode: 404,
        message: `No se encontró la categoría con el identificador: ${id}`,
        entity: null
      };
    }

    const categoryToRemove = await repository.save(category);
    await repository.softRemove(categoryToRemove);

    return {
      message: `Se eliminó correctamente la categoría con el identificador: ${id}`,
      entity: null
    };
  }

  async restore (id: number): Promise<Partial<IResult>> {
    const result = await repository.restore(id);

    if (result.affected === 0) {
      return {
        message: `No se pudo restaurar la categoría con el identificador: ${id}`,
        entity: null
      };
    }

    return {
      message: `Se restauró correctamente la categoría con el identificador: ${id}`,
      entity: null
    };
  }
}
