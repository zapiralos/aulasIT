import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity('modes')
export class Mode extends BaseEntity {
  @Column({ name: 'modeName' })
    name: string;
}
