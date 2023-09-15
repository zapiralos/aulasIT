import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Course } from '../courses/course.entity';

@Entity('modes')
export class Mode extends BaseEntity {
  @Column({ name: 'name' })
    name: string;

  @OneToMany(() => Course, (course) => course.mode)
    courses: Course[];
}
