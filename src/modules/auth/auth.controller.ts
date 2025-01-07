import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from 'src/dtos/user.register.dto';
import { ResponseModel } from 'src/helpers/responseModel';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  @ApiTags('User')
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

  @Post('login')
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
  
}
