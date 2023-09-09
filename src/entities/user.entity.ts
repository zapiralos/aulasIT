import { Entity, Column } from 'typeorm';
import { baseEntity } from './base.entity';

@Entity('users')
export class User extends baseEntity {
  @Column({
    type: 'varchar',
    unique: true
  })
    email: string;

  @Column({
    name: 'pass'
  })
    password: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'first_name'
  })
    firstName: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'last_name'
  })
    lastName: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true
  })
    address?: string | null;

  @Column({
    name: 'phone_number'
  })
    phoneNumber: number;

  @Column({
    name: 'birth_date'
  })
    birthDate: Date;

  @Column({
    type: 'varchar',
    length: 100
  })
    guardian: string;

  @Column({
    type: 'int',
    name: 'id_position'
  })
    positionId?: number | null;

  @Column({
    type: 'int',
    name: 'id_area'
  })
    areaId?: number | null;

  @Column({
    type: 'int',
    name: 'id_social_wellfare'
  })
    socialWellfareId?: number | null;
}
