import { BaseRepository } from '../base/base.repository';
import { Category } from './category.entity';

export class CategoriesRepository extends BaseRepository<Category> {
  constructor () {
    super(Category);
  }
}
