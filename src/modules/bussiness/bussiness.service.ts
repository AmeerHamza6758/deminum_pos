import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBusinessDto } from 'src/dtos/bussiness.dto';
import { BusinessRegisterSchema } from 'src/models/bussiness.model';
import { Repository } from 'typeorm';

@Injectable()
export class BussinessService {
  constructor(
    @InjectRepository(BusinessRegisterSchema)
    private bussinessModel: Repository<BusinessRegisterSchema>,
  ) {}

  async createBussiness(body: CreateBusinessDto) {
    // const existingBussiness = await this.bussinessModel.find
    const response = this.bussinessModel.create(body);
    const savedBussiness = await this.bussinessModel.save(response);
    return savedBussiness;
  }

  findAll() {
    return `This action returns all bussiness`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bussiness`;
  }

  update(id: number, updateBussinessDto: any) {
    return `This action updates a #${id} bussiness`;
  }

  remove(id: number) {
    return `This action removes a #${id} bussiness`;
  }
}
