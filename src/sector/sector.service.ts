import { type IResult, RESULT_OK, NOT_FOUND } from '../utils/interfaces/result.interface';
import { type UpdateSectorDTO, type CreateSectorDTO } from './dto/sector.dto';
import { extractErrorKeysFromErrors } from '../utils/functions';
import { validate } from 'class-validator';
import { StatusCodes } from 'http-status-codes';
import { SectorRepository } from './sector.repository';
import { type Sector } from './sector.entity';

const repository = new SectorRepository();

export class SectorService {
  async create (sectorData: CreateSectorDTO): Promise<IResult> {
    const errors = await validate(sectorData);

    if (errors.length > 0) {
      const errorKeys = extractErrorKeysFromErrors(errors);

      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `Error al crear un nuevo sector: ${errors}`,
        entity: null,
        resultKeys: errorKeys
      };
    }

    // const sector = repository.create(sectorData);
    const sectorCreated = await repository.save(sectorData);

    return {
      statusCode: StatusCodes.OK,
      message: 'Usuario creado con éxito!.',
      entity: sectorCreated,
      resultKeys: [RESULT_OK]
    };
  }

  async find (): Promise<Sector[]> {
    return await repository.find();
  }

  async findById (id: number): Promise<IResult> {
    const sector = await repository.findOneBy({ id });

    if (sector === null) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: `No se encontró un Sector con el ID: ${id}.`,
        entity: null,
        resultKeys: [NOT_FOUND]
      };
    }

    return {
      statusCode: StatusCodes.OK,
      message: `Sector con ID ${id} encontrado.`,
      entity: sector,
      resultKeys: [RESULT_OK]
    };
  }

  async update (id: number, sectorData: UpdateSectorDTO): Promise<IResult> {
    const errors = await validate(sectorData);

    if (errors.length > 0) {
      const errorKeys = extractErrorKeysFromErrors(errors);

      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `Hubo un error de validación al actualizar el usuario: ${errors}.`,
        entity: null,
        resultKeys: errorKeys
      };
    }

    const sector = await repository.findOneBy({ id });

    if (sector === null) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: `No se encontró un sector con el ID: ${id}.`,
        entity: null,
        resultKeys: [NOT_FOUND]
      };
    }

    await repository.update(id, sectorData);

    const sectorUpdated = await repository.findOneBy({ id });

    return {
      statusCode: StatusCodes.OK,
      message: 'El sector ha sido actualizado con exito!',
      entity: sectorUpdated,
      resultKeys: [RESULT_OK]
    };
  }

  async delete (id: number): Promise<IResult> {
    const sectorToDelete = await repository.findOneBy({ id });

    if (sectorToDelete === null) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: `No se encontró un Sector con el ID: ${id}.`,
        entity: null,
        resultKeys: [NOT_FOUND]
      };
    }

    await repository.update(id, { deletedAt: new Date() });

    return {
      statusCode: StatusCodes.OK,
      message: `El sector con ID ${id} fue eliminado con exito!`,
      entity: null,
      resultKeys: [RESULT_OK]
    };
  }
}
