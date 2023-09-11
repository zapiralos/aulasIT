import { DataSource } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { User } from './users/user.entity';
import { Course } from './courses/course.entity';
import 'reflect-metadata';
import { Sector } from './sector/sector.entity';

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) ?? 3000,
  username: process.env.DB_USERNAME ?? 'root',
  database: process.env.DB_DATABASE ?? 'aulasit',
  synchronize: true,
  entities: [BaseEntity, User, Course, Sector],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts']
});

export async function connect (): Promise<DataSource> {
  await dataSource.initialize();
  console.log('Connected to MySQL database');
  return dataSource;
}
