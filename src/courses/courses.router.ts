import { Router, type Request, type Response } from 'express';
import { CoursesController } from './courses.controller';
import { StatusCodes } from 'http-status-codes';

export const router = Router();
const controller = new CoursesController();

router.post('/create', controller.createCourse);
router.get('/list', controller.listCourses);
router.get('/find', controller.findCourse);
router.patch('/update', controller.updateCourse);
router.delete('/delete', controller.deleteCourse);
router.patch('/restore', controller.restoreCourse);

// wildcard for inexistent routes
router.use('/*', (_req: Request, res: Response) => {
  res.status(StatusCodes.NOT_IMPLEMENTED).send('Este endpoint no existe.');
});
