import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Queue } from 'bull';
import { QueueNames } from 'src/helpers/constants';
import { MailInput } from 'src/helpers/interfaces/email.template.interface';
import { UserRegisterSchema } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class SharedService {
  constructor(
    @InjectRepository(UserRegisterSchema)
    private userRegisterModel: Repository<UserRegisterSchema>,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    private mailerService: MailerService,
    @InjectQueue(QueueNames.EMAIL_QUEUE) private readonly emailQueue: Queue,
  ) {}

  // Check Password
  async generatePasswordHash(password: string) {
    const salt = await bcrypt.genSalt(+process.env.SALT_ROUND);
    return await bcrypt.hash(password, salt);
  }

  async comparePasswords(password: string, hasedPassword: string) {
    return await bcrypt.compare(password, hasedPassword);
  }

  // Generate OTP code
  generateOtpCode() {
    const min = 1000;
    const max = 9999;

    return this.configService.get<string>('NODE_ENV') == 'development'
      ? '1234'
      : String(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  //   get Profile
  async getProfile(body: any) {
    const user = await this.userRegisterModel.findOne({
      where: {
        id: body.id,
      },
    });
    return user;
  }

  //   Generate Token
  async generateToken(user: UserRegisterSchema) {
    try {
      const payload = {
        id: user.id,
        email: user.email,
        role: user.roleName,
      };
      return await this.jwtService.sign(payload);
    } catch (error) {
      throw new BadRequestException('unable to generate token');
    }
  }

  // Add Email to Queue
  async addEmailToQueue(data: MailInput) {
    await this.emailQueue.add('sendEmail', data);
  }

  //Email service
  async sendEmail(data: MailInput) {
    try {
      await this.mailerService.sendMail(data);
    } catch (error) {
      console.log(error.message);
    }
  }
}
