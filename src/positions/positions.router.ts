import { Router, Request, Response } from 'express';
import { PositionsController } from './positions.controller';
import { StatusCodes } from 'http-status-codes';
import { MessagesCodes } from '../utils/messages-codes';

export const router = Router();
const controller = new PositionsController();

router.get('/find', controller.find);
router.get('/list', controller.list);
router.post('/create', controller.create);
router.patch('/update', controller.update);
router.delete('/delete', controller.delete);
router.patch('/restore', controller.restore);

// wildcard for inexistent routes
router.use('/*', (_req: Request, res: Response) => {
  res.status(StatusCodes.NOT_IMPLEMENTED).send(MessagesCodes.NOT_IMPLEMENTED);
});
