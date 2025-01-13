import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/databse.config';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';
import { emailConfig } from './config/email.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { AdminSeederService } from './modules/seeder/admin-seeder.service';
import { UserRegisterSchema } from './models/user.model';
import { BusinessRegisterSchema } from './models/bussiness.model';
import { BussinessModule } from './modules/bussiness/bussiness.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRootAsync({
    //   useFactory: databaseConfig,
    // }),
    TypeOrmModule.forRoot({
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
      entities: [__dirname + './models/*.ts'],
      migrations: [__dirname + './migrations/*.ts'],
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
        maxRetriesPerRequest: 100,
        connectTimeout: 10000,
      },
    }),
    MailerModule.forRootAsync({
      useFactory: emailConfig,
    }),
    TypeOrmModule.forFeature([UserRegisterSchema, BusinessRegisterSchema]),
    AuthModule,
    BussinessModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService, AdminSeederService],
})
export class AppModule implements OnModuleInit {
  constructor(private adminseederService: AdminSeederService) {}
  async onModuleInit() {
    await this.adminseederService.seedAdmin();
  }
}
