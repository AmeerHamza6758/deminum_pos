import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserRegisterSchema } from 'src/models/user.model';

export const databaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  autoLoadEntities: true,
  synchronize: false,
  migrationsRun: true,
  entities: [__dirname + '../models/*.ts'],
  migrations: [__dirname + '../migrations/*.ts'],
});
 