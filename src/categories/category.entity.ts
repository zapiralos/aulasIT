import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Course } from '../courses/course.entity';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({
    type: 'varchar',
    name: 'category_name',
    unique: true
  })
    name: string;

  @OneToMany(() => Course, (course) => course.category)
    courses: Course[];
}
