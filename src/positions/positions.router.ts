import { Router } from 'express';
import { PositionsController } from './positions.controller';

export const router = Router();
const controller = new PositionsController();

router.get('/find', controller.find);
router.get('/list', controller.list);
router.post('/create', controller.create);
router.patch('/update', controller.update);
router.delete('/delete', controller.delete);
router.patch('/restore', controller.restore);
