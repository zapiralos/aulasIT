import { Sector } from './sector.entity';
import { BaseRepository } from '../base/base.repository';

export class SectorRepository extends BaseRepository<Sector> {
  constructor () {
    super(Sector);
  }
}
