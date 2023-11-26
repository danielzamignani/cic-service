require('dotenv').config();
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST_NAME,
  port: +process.env.POSTGRES_HOST_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['dist/entities/*.entity.js'],
  migrations: ['dist/shared/infra/typeorm/migrations/*.js'],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
