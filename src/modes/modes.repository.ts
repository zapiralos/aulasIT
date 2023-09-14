import { BaseRepository } from '../base/base.repository';
import { Mode } from './mode.entity';

export class ModesRepository extends BaseRepository<Mode> {
  constructor () {
    super(Mode);
  }
}
