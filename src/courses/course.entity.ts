import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity('courses')
export class Course extends BaseEntity {
  @Column({
    type: 'decimal',
    name: 'price'
  })
    price: number;

  @Column({
    type: 'int',
    name: 'mode_id'
  })
    modeId: number;

  @Column({
    type: 'int',
    name: 'category_id'
  })
    categoryId: number;

  @Column({
    type: 'int',
    name: 'teacher_id'
  })
    teacherId: number;

  @Column({
    type: 'int',
    name: 'subject_id'
  })
    subjectId: number;
}
