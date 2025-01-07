import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfig,
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
    AuthModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
