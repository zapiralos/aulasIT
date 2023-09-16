import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { User } from '../users/user.entity';

@Entity('positions')
export class Position extends BaseEntity {
  @Column()
    positionName: string;

  @OneToMany(() => User, (user) => user.position)
    users: User[];
}
