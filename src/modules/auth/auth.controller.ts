import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from 'src/dtos/user.register.dto';
import { ResponseModel } from 'src/helpers/responseModel';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/dtos/login.dto';
import { UpdatePasswordDto } from 'src/dtos/reset-password.dto';
import { UserRegisterSchema } from 'src/models/user.model';
import { GetUser } from 'src/helpers/global.decorator';
import { SocialLoginDto } from 'src/dtos/SocialLogin.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  async register(@Body() body: UserRegisterDto) {
    const response = await this.authService.register(body);
    return new ResponseModel(
      true,
      response,
      'User registered successfully',
      null,
    );
  }

  // Login
  @Post('/login')
  async login(@Body() body: LoginDto) {
    const response = await this.authService.login(body);
    return new ResponseModel(
      true,
      response,
      'User logged in successfully',
      null,
    );
  }

  // otp verification
  @Post('/resend-otp')
  async sendOtp(@Body() email: string) {
    const resp = await this.authService.sendOtp(email);
    return new ResponseModel(true, resp, 'OTP sent successfully', null);
  }

  // reset password
  @Patch('/reset-password')
  async resetPassword(
    @Body() body: UpdatePasswordDto,
    @GetUser() user: UserRegisterSchema,
  ) {
    const response = await this.authService.resetPassword(body, user);
  }

  // Social Login
  @Post('social-login')
  async socialLogin(@Body() body: SocialLoginDto) {
    const response = await this.authService.socialLogin(body);
    return new ResponseModel(
      true,
      response,
      'User logged in successfully',
      null,
    );
  }
}
