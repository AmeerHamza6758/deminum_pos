import { Module } from '@nestjs/common';
import { BussinessService } from './bussiness.service';
import { BussinessController } from './bussiness.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessRegisterSchema } from 'src/models/bussiness.model';
import { UserRegisterSchema } from 'src/models/user.model';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BusinessRegisterSchema, UserRegisterSchema]),
    SharedModule,
  ],
  controllers: [BussinessController],
  providers: [BussinessService],
})
export class BussinessModule {}
 