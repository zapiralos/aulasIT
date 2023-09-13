import { BaseRepository } from '../base/base.repository';
import { Position } from './position.entity';

export class PositionsRepository extends BaseRepository<Position> {
  constructor () {
    super(Position);
  }
}
