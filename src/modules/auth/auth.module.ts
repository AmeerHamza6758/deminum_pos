import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRegisterSchema } from 'src/models/user.model';
import { otpCodeSchema } from 'src/models/otp.model';

@Module({
  imports: [TypeOrmModule.forFeature([UserRegisterSchema, otpCodeSchema])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}