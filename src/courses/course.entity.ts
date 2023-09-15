import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Mode } from '../modes/mode.entity';

@Entity('courses')
export class Course extends BaseEntity {
  @Column({
    type: 'decimal',
    name: 'price'
  })
    price: number;

  @ManyToOne(() => Mode, (mode) => mode.id, { nullable: false, cascade: true })
    mode: Mode;

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
