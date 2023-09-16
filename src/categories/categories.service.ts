import { validate } from 'class-validator';
import { IResult } from '../utils/interfaces/result.interface';
import { CategoriesRepository } from './categories.repository';
import { Category } from './category.entity';

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

  async findByNameWithoutValidation (name: string): Promise<Category | null> {
    return await repository.findOneBy({ name });
  }
}
