import { Router, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CategoriesController } from './categories.controller';

export const router = Router();
const controller = new CategoriesController();

router.post('/create', controller.create);
router.get('/list', controller.list);
router.get('/find', controller.find);
router.patch('/update', controller.update);
router.delete('/delete', controller.delete);
router.patch('/restore', controller.restore);

// wildcard for inexistent routes
router.use('/*', (_req: Request, res: Response) => {
  res.status(StatusCodes.NOT_IMPLEMENTED).send('Este endpoint no está disponible.');
});
