import { Global, Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { SharedController } from './shared.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRegisterSchema } from 'src/models/user.model';
import { BullModule } from '@nestjs/bull';
import { QueueNames } from 'src/helpers/constants';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    BullModule.registerQueue({ name: QueueNames.EMAIL_QUEUE }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRED_IN },
    }),
    // forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserRegisterSchema]),
  ],
  controllers: [SharedController],
  providers: [SharedService, JwtStrategy],
  exports: [SharedService, JwtStrategy, PassportModule],
})
export class SharedModule {}
