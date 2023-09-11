import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../base/base.entity';

@Entity('areas')
export class Sector extends BaseEntity {
  @Column({
    type: 'varchar',
    name: 'sector_name',
    unique: true
  })
    sectorName: string;
}
