import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBusinessDto } from 'src/dtos/bussiness.dto';
import { BusinessRegisterSchema } from 'src/models/bussiness.model';
import { UserRegisterSchema } from 'src/models/user.model';
import { ILike, Repository } from 'typeorm';
import { calculateTotalPages, SharedService } from '../shared/shared.service';
import { PaginationQueryDto } from 'src/dtos/pagination.dto';
import { UpdateBusinessDto } from 'src/dtos/updateBussinessdto';
import { ResponseModel } from 'src/helpers/responseModel';

@Injectable()
export class BussinessService {
  constructor(
    @InjectRepository(BusinessRegisterSchema)
    private bussinessModel: Repository<BusinessRegisterSchema>,
    @InjectRepository(UserRegisterSchema)
    private userModel: Repository<UserRegisterSchema>,
    private sharedService: SharedService,
  ) {}

  async createBussiness(body: CreateBusinessDto) {
    try {
      const existingUser = await this.userModel.findOne({
        where: {
          email: body.email,
          username: body.username,
        },
      });

      const existingBussiness = await this.bussinessModel.findOne({
        where: {
          bussinessName: body.bussinessName,
          bussinessContactNumber: body.bussinessContactNumber,
        },
      });

      if (existingBussiness && existingUser) {
        throw new BadRequestException(
          'Business already registered with the same person and business Name.',
        );
      }

      let user = existingUser;
      if (!user) {
        user = await this.userModel.create({
          prefix: body.prefix,
          fname: body.fname,
          lname: body.lname,
          username: body.username,
          email: body.email,
          password: await this.sharedService.generatePasswordHash(
            body.password,
          ),
        });
        await this.userModel.save(user);
      }
      const response = this.bussinessModel.save({
        ...body,
        user,
      });

      return response;
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException(
        'Failed to create business.',
        error.message,
      );
    }
  }

  async findAll(query: PaginationQueryDto) {
    try {
      const { search, page, limit, sort, order } = query;
      const skip = (Number(page) - 1) * Number(limit);
      const where: any = {};
      if (search) {
        where.bussinessName = ILike(`%${search}%`);
      }

      const orderBy: any = {};
      if (sort) {
        orderBy[sort] = order || 'ASC';
      } else {
        orderBy.createdAt = 'DESC';
      }

      const [data, total] = await this.bussinessModel.findAndCount({
        where,
        relations: ['user'],
        order: orderBy,
        skip,
        take: Number(limit),
      });

      const totalPages = calculateTotalPages(total, limit);

      return {
        data,
        total,
        currentPage: page,
        totalPages,
      };
    } catch (error) {
      console.log(error.message, 'Error getting all records');
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    const response = await this.bussinessModel.findOne({ where: { id: id } });
    if (!response) {
      throw new BadRequestException('Business not found.');
    }
    return response;
  }

  async update(id: number, body: UpdateBusinessDto) {
    try {
      const business = await this.bussinessModel.findOne({ where: { id } });

      if (!business) {
        throw new BadRequestException(`Business with ID ${id} not found.`);
      }
      await this.bussinessModel.update(id, body);

      const updatedBusiness = await this.bussinessModel.findOne({
        where: { id },
      });

      return updatedBusiness;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async remove(id: number) {
    const bussiness = await this.bussinessModel.findOne({ where: { id: id } });
    if (!bussiness) {
      throw new BadRequestException('Bussiness not found.');
    }
    const user = bussiness.userId;
    await this.bussinessModel.delete(id);
    await this.userModel.delete(user);
    return true;
  }
}
