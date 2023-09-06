import { type EntityTarget, Repository } from 'typeorm';
import { dataSource } from '../typeorm-config';
import { type baseEntity } from '../entities/base.entity';

export abstract class BaseRepository<T extends baseEntity> extends Repository<T> {
  protected constructor (entity: EntityTarget<T>) {
    super(entity, dataSource.manager);
  }
}
