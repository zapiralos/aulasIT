import { validate } from 'class-validator';
import { IResult } from '../utils/interfaces/result.interface';
import { CreateModeDTO } from './dto/create-mode.dto';
import { ModesRepository } from './modes.repository';

const repository = new ModesRepository();

export class ModesService {
  async create (data: CreateModeDTO): Promise<Partial<IResult>> {
    const errors = await validate(data);

    if (errors.length > 0) {
      throw new Error(`No se pudo agregar la nueva modalidad debido a: ${errors}`);
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
}
