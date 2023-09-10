import { Column, Entity } from 'typeorm';
import { baseEntity } from './base.entity';

@Entity('courses')
export class Course extends baseEntity {
  @Column({
    type: 'decimal',
    name: 'price'
  })
    price: number;
}
