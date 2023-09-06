import { Entity, Column } from 'typeorm';
import { baseEntity } from './base.entity';

@Entity('usuarios')
export class User extends baseEntity {
  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    name: 'nombre_usuario'
  })
    username: string;

  @Column({
    name: 'pass'
  })
    password: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'nombre'
  })
    firstName: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'apellido'
  })
    lastName: string;

  @Column({
    type: 'varchar',
    unique: true
  })
    email: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    name: 'domicilio'
  })
    address?: string | null;

  @Column({
    type: 'integer',
    name: 'tipo'
  })
    userType: number;
}
