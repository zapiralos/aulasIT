import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Mode } from '../modes/mode.entity';
import { Category } from '../categories/category.entity';

@Entity('courses')
export class Course extends BaseEntity {
  @Column({
    type: 'decimal',
    name: 'price'
  })
    price: number;

  @Column({
    type: 'int',
    name: 'id_mode'
  })
    modeId?: number | null;

  @ManyToOne(() => Mode, (mode) => mode.id)
  @JoinColumn({
    name: 'id_mode'
  })
    mode: Mode;

  @Column({
    type: 'int',
    name: 'id_category'
  })
    categoryId: number | null;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({
    name: 'id_category'
  })
    category: Category;

  @Column({
    type: 'int',
    name: 'id_teacher'
  })
    teacherId: number | null;

  @Column({
    type: 'int',
    name: 'id_subject'
  })
    subjectId: number | null;
}
