import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterDto } from 'src/dtos/user.register.dto';
import { UserRegisterSchema } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { SharedService } from '../shared/shared.service';
import { otpCodeSchema } from 'src/models/otp.model';
import { EmailTemplates } from 'src/helpers/constants';
import { LoginDto } from 'src/dtos/login.dto';
import { UpdatePasswordDto } from 'src/dtos/reset-password.dto';
import { SocialLoginDto } from 'src/dtos/SocialLogin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRegisterSchema)
    private userRegistrationModel: Repository<UserRegisterSchema>,
    @InjectRepository(otpCodeSchema)
    private otpModel: Repository<otpCodeSchema>,
    private sharedService: SharedService,
  ) {}

  async register(
    body: UserRegisterDto,
  ): Promise<{ user: UserRegisterSchema; token: string }> {
    try {
      console.log('Registering user:', body.email);
      const hashedPassword = await this.sharedService.generatePasswordHash(
        body.password.trim(),
      );
      delete body.password;
      const existingUser = await this.userRegistrationModel.findOneBy({
        email: body.email,
      });
      if (existingUser) {
        throw new BadRequestException('User already registered.');
      }
      const user = this.userRegistrationModel.create({
        ...body,
        password: hashedPassword,
      });
      const otpCode = await this.sharedService.generateOtpCode();
      await this.otpModel.save({
        otp: otpCode,
        email: user.email,
      });
      const token = await this.sharedService.generateToken(user);
      await this.sharedService.addEmailToQueue({
        to: user.email,
        subject: 'Confirm your account!',
        template: EmailTemplates.CONFIRM_ACCOUNT,
        context: {
          appName: process.env.APP_NAME,
          otpCode,
        },
      });
      const savedUser = await this.userRegistrationModel.save(user);

      return {
        user: savedUser,
        token,
      };
    } catch (error) {
      console.error('Error during registration:', error);
      throw new BadRequestException(
        'Unable to register user. ' + error.message,
      );
    }
  }

  // Login User
  async login(body: LoginDto) {
    try {
      const user = await this.userRegistrationModel.findOneBy({
        email: body.email,
      });
      if (!user) {
        throw new BadRequestException('User not found.');
      }

      if (user.isVerified === true) {
        const checkPassword = await this.sharedService.comparePasswords(
          body.password,
          user.password,
        );
        if (checkPassword) {
          const token = await this.sharedService.generateToken(user);
          return {
            user,
            token,
          };
        } else {
          throw new BadRequestException('Invalid password.');
        }
      } else {
        const otp = await this.sharedService.generateOtpCode();
        await this.otpModel.create({ otp, email: user.email });

        await this.sharedService.addEmailToQueue({
          to: body.email,
          subject: 'Confirm your account!',
          template: EmailTemplates.CONFIRM_EMAIL,
          context: {
            appName: process.env.APP_NAME,
            name: user.fname,
            otp: otp,
          },
        });
        throw new BadRequestException(
          'User not verified. Please check your email for the OTP.',
        );
      }
    } catch (error) {
      throw new BadRequestException(error.message || 'Login failed.');
    }
  }

  // Send OTP
  async sendOtp(email: string) {
    const existingUser = await this.userRegistrationModel.findOneBy({ email });

    if (!existingUser) {
      throw new BadRequestException('Please enter a valid email address');
    }
    const otp = await this.sharedService.generateOtpCode();
    try {
      await this.sharedService.addEmailToQueue({
        to: email,
        subject: 'Confirm your account!',
        template: EmailTemplates.CONFIRM_EMAIL,
        context: {
          appName: process.env.APP_NAME,
          otp,
        },
      });

      await this.otpModel.save({
        otp,
        email,
      });
      return { message: 'OTP has been sent to your email.' };
    } catch (error) {
      console.log('Error while sending the otp code');
      throw new Error('Failed to send verification email.');
    }
  }

  // Reset Password
  async resetPassword(body: UpdatePasswordDto, user: UserRegisterDto) {
    try {
      const hashedPassword = await this.sharedService.generatePasswordHash(
        body.password,
      );

      await this.userRegistrationModel.update(user.id, {
        password: hashedPassword,
      });
      body.password = undefined;
    } catch (error) {
      throw new Error(error + 'Failed to update user password');
    }
  }

  // Social Login
  async socialLogin(body: SocialLoginDto) {
    const { name, email, uid, provider } = body;
    let checkUser = await this.userRegistrationModel.findOne({
      where: {
        uid: uid,
        provider: provider,
      },
    });
    if (!checkUser) {
      checkUser = await this.userRegistrationModel.save({
        ...body,
        isVerified: true,
      });
    }

    const token = await this.sharedService.generateToken(checkUser);
    return { user: checkUser, token };
  }
}
