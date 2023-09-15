import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Position } from '../positions/position.entity';
import { Sector } from '../sector/sector.entity';

@Entity('users')
export class User extends BaseEntity {
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

  @ManyToOne(() => Position, (position) => position.id)
    position?: Position | null;

  @Column({
    type: 'int',
    name: 'id_area'
  })
    areaId?: number | null;

  @ManyToOne(() => Sector, (sector) => sector.users)
  @JoinColumn({
    name: 'id_area'
  })
    area: Sector;

  @Column({
    type: 'int',
    name: 'id_social_wellfare' /* tabla socialwelfare */
  })
    socialWellfareId?: number | null;
}
