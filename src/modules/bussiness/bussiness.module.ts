import { Module } from '@nestjs/common';
import { BussinessService } from './bussiness.service';
import { BussinessController } from './bussiness.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessRegisterSchema } from 'src/models/bussiness.model';

@Module({
  imports:[TypeOrmModule.forFeature([BusinessRegisterSchema])],
  controllers: [BussinessController],
  providers: [BussinessService],
})
export class BussinessModule {}
