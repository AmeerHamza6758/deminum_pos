import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/helpers/constants';
import { UserRegisterSchema } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class AdminSeederService {
  constructor(
    @InjectRepository(UserRegisterSchema)
    private adminModel: Repository<UserRegisterSchema>,
    private sharedService: SharedService,
  ) {}

  async seedAdmin(): Promise<void> {
    try {
      const existingAdmin = await this.adminModel.findOneBy({
        roleName: 'superadmin',
      });
      if (existingAdmin) {
        console.log('Admin already exists.');
        return;
      }

      const adminData = await this.adminModel.create({
        email: 'admin@gmail.com',
        fname: 'Admin',
        lname: 'admin',
        password: await this.sharedService.generatePasswordHash('12345678'),
        roleName: 'superadmin',
        isVerified: true,
      });
      await this.adminModel.save(adminData);
    } catch (error) {
      throw new BadRequestException(error.message, 'Admin Seeder Error');
    }
  }
}
