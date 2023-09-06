import { DataSource } from 'typeorm';
import 'reflect-metadata';

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts']
});

export async function connect (): Promise<DataSource> {
  await dataSource.initialize();
  console.log('Connected to MySQL database');
  return dataSource;
}
