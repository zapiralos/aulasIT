import { Course } from './course.entity';
import { BaseRepository } from '../base/base.repository';

export class CoursesRepository extends BaseRepository<Course> {
  constructor () {
    super(Course);
  }
}
