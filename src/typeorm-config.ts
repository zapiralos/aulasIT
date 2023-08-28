import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_DATABASE,
  entities: ['src/entities/*.js'],
  synchronize: true
});

export async function connect (): Promise<DataSource> {
  await dataSource.initialize();
  console.log('Connected to MySQL database');
  return dataSource;
}
