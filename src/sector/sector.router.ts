import { Router } from 'express';
import { SectorController } from './sector.controller';

const sectorRouter = Router();
const sectorController = new SectorController();

sectorRouter.post('/', sectorController.create);
sectorRouter.get('/', sectorController.getAllSectors);
sectorRouter.get('/:id', sectorController.getSector);
sectorRouter.put('/:id', sectorController.update);
sectorRouter.delete('/:id', sectorController.delete);

export default sectorRouter;
