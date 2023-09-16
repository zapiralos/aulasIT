import { validate } from 'class-validator';
import { IResult } from '../utils/interfaces/result.interface';
import { CreateModeDTO } from './dto/create-mode.dto';
import { ModesRepository } from './modes.repository';
import { Mode } from './mode.entity';

const repository = new ModesRepository();

export class ModesService {
  async create (data: CreateModeDTO): Promise<Partial<IResult>> {
    const errors = await validate(data);

    if (errors.length > 0) {
      return {
        message: `No se pudo agregar la modalidad debido a: ${errors}`,
        entity: null
      };
    }

    const modeInstance = repository.create(data);
    const mode = await repository.save(modeInstance);

    if (!mode) {
      return {
        message: 'Ocurrió un error al agregar la nueva modalidad.',
        entity: null
      };
    }

    return {
      message: `Se agregó exitosamente la nueva modalidad con el identificador: ${mode.id}`,
      entity: mode
    };
  }

  async findById (id: number): Promise<Partial<IResult>> {
    const [mode] = await repository.find({
      where: { id },
      relations: {
        courses: true
      }
    });

    if (!mode) {
      return {
        message: `No se encontró la modalidad con el identificador: ${id}`,
        entity: null
      };
    }

    return {
      message: `Se encontró la modalidad con el identificador: ${id}`,
      entity: mode
    };
  }

  async findByName (name: string): Promise<Partial<IResult>> {
    const mode = await repository.findOneBy({ name });

    if (!mode) {
      return {
        message: `No se encontró el modo ${name}`,
        entity: null
      };
    }

    return {
      message: `Se encontró el modo ${name}`,
      entity: mode
    };
  }

  async findByNameWithoutValidation (name: string): Promise<Mode | null> {
    const [mode] = await repository.find({ where: { name }, withDeleted: true });

    if (!mode) return null;

    return mode;
  }

  async delete (id: number): Promise<Partial<IResult>> {
    const mode = await repository.find({ where: { id }, relations: { courses: true } });

    if (mode.length === 0) {
      return {
        statusCode: 404,
        message: `No se encontró la modalidad con el identificador: ${id}`,
        entity: null
      };
    }

    const modeToRemove = await repository.save(mode);
    await repository.softRemove(modeToRemove);

    return {
      message: `Se eliminó correctamente la modalidad con el identificador: ${id}`,
      entity: null
    };
  }

  async restore (id: number): Promise<Partial<IResult>> {
    const result = await repository.restore(id);
    const { entity } = await this.findById(id);

    if (result.affected === 0) {
      return {
        message: `No se pudo restaurar la categoría con el identificador: ${id}`,
        entity: null
      };
    }

    return {
      message: `Se restauró correctamente la categoría con el identificador: ${id}`,
      entity
    };
  }
}
