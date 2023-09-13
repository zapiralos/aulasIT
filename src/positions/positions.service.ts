import { validate } from 'class-validator';
import { IFindOptions } from '../utils/interfaces/options.interface';
import { IResult } from '../utils/interfaces/result.interface';
import { CreatePositionDTO } from './dto/create-position.dto';
import { PositionsRepository } from './positions.repository';
import { Position } from './position.entity';

const repository = new PositionsRepository();

export class PositionsService {
  async create (data: CreatePositionDTO): Promise<Partial<IResult>> {
    const errors = await validate(data);

    if (errors.length > 0) {
      throw new Error(`No se pudo agregar el cargo debido a: ${errors}`);
    }

    const positionInstance = repository.create(data);
    const position = await repository.save(positionInstance);

    return {
      message: `Se agregó exitosamente el nuevo cargo con el identificador: ${position.id}`,
      entity: position
    };
  }

  async find (id: number, options?: IFindOptions): Promise<Partial<IResult>> {
    const [position] = await repository.find({
      where: { id },
      withDeleted: options?.withDeleted ?? false
    });

    if (!position) {
      return {
        message: `No se encontró un cargo con el identificador: ${id}`,
        entity: null
      };
    }

    return {
      message: `Se encontró correctamente un cargo con el identificador: ${id}`,
      entity: position
    };
  }

  async list (): Promise<Partial<IResult>> {
    return {
      message: 'Cargos guardados.',
      entities: await repository.find()
    };
  }

  async update (id: number, attrs: Partial<Position>): Promise<Partial<IResult>> {
    const { entity: savedPosition } = await this.find(id);

    if (!savedPosition) {
      return {
        message: `No se encontró el curso con el identificador: ${id}`,
        entity: null
      };
    }

    Object.assign(savedPosition, attrs);

    const position = await repository.save(savedPosition);

    return {
      message: `Se actualizó exitosamente la información del cargo con el identificador: ${id}`,
      entity: position
    };
  }

  async delete (id: number): Promise<Partial<IResult>> {
    const result = await repository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: `No se pudo borrar el cargo con el identificador: ${id}`,
        entity: null
      };
    }

    return {
      message: `Se eliminó correctamente el cargo con el identificador: ${id}`,
      entity: null
    };
  }

  async restore (id: number): Promise<Partial<IResult>> {
    const result = await repository.restore(id);

    if (result.affected === 0) {
      return {
        message: `No se pudo restaurar el cargo con el identificador: ${id}`,
        entity: null
      };
    }

    return {
      message: `Se restauró correctamente el cargo con el identificador: ${id}`,
      entity: null
    };
  }
}
