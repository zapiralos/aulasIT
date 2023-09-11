import { plainToInstance } from 'class-transformer';
import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CreateSectorDTO, UpdateSectorDTO } from './dto/sector.dto';
import { SectorService } from './sector.service';

const sectorService = new SectorService();

export class SectorController {
  async create (req: Request, res: Response): Promise<void> {
    try {
      const sectorInstance = plainToInstance(CreateSectorDTO, req.body);

      const sector = await sectorService.create(sectorInstance);

      res.status(StatusCodes.OK).json({
        message: sector.message,
        data: { result: sector.entity },
        resultKeys: sector.resultKeys
      });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

  async getAllSectors (req: Request, res: Response): Promise<void> {
    try {
      const sectors = await sectorService.find();

      res.status(StatusCodes.OK)
        .json({
          data: {
            result: sectors,
            count: sectors.length
          }
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

  async getSector (req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const sector = await sectorService.findById(id);

      res.status(StatusCodes.OK)
        .json({
          message: sector.message,
          data: { result: sector.entity },
          resultKeys: sector.resultKeys
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

  async update (req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const sectorToUpdate = plainToInstance(UpdateSectorDTO, req.body);

      const sector = await sectorService.update(id, sectorToUpdate);

      res.status(StatusCodes.OK)
        .json({
          message: sector.message,
          data: { result: sector.entity },
          resultKeys: sector.resultKeys
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

  async delete (req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      const sector = await sectorService.delete(id);

      res.status(StatusCodes.OK)
        .json({
          message: sector.message,
          data: { result: sector.entity },
          resultKeys: sector.resultKeys
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }
}
