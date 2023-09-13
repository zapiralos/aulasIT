import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity('positions')
export class Position extends BaseEntity {
  @Column()
    positionName: string;
}
