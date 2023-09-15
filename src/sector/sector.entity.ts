import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../base/base.entity';
import { User } from '../users/user.entity';

@Entity('areas')
export class Sector extends BaseEntity {
  @Column({
    type: 'varchar',
    name: 'sector_name',
    unique: true
  })
    sectorName: string;

  @OneToMany(() => User, (user) => user.area)
    users: User[];
}
