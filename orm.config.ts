import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.POSTGRES_PASSWORD,
  autoLoadEntities: true,
  synchronize: true,
});
