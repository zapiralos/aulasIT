import { Course } from '../entities/course.entity';
import { BaseRepository } from './base.repository';

export class CoursesRepository extends BaseRepository<Course> {
  constructor () {
    super(Course);
  }
}
