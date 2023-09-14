import { Router } from 'express';
import { ModesController } from './modes.controller';

export const router = Router();
const controller = new ModesController();

router.get('/find', controller.find);
router.get('/list', controller.list);
router.post('/create', controller.create);
router.patch('/update', controller.update);
router.delete('/delete', controller.delete);
router.patch('/restore', controller.restore);
