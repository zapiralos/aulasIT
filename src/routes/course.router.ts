import { Router } from 'express';
import { CoursesController } from '../controllers/courses.controller';

export const router = Router();
const controller = new CoursesController();

router.get('/list', controller.listCourses);
/* coursesRouter.get('/find', coursesController.listCourses);
coursesRouter.post('/create', coursesController.listCourses);
coursesRouter.patch('/update', coursesController.listCourses);
coursesRouter.delete('/delete', coursesController.listCourses); */
