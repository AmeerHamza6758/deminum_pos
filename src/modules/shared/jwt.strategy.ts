import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import 'dotenv/config';
import { ConfigService } from '@nestjs/config';
import { UserRegisterSchema } from 'src/models/user.model';
import { JwtPayload } from 'src/helpers/interfaces/jwt-payload.interface';
import { SharedService } from './shared.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly sharedService: SharedService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  //Validate
  async validate(payload: JwtPayload): Promise<UserRegisterSchema> {
    try {
      const { id } = payload;
      console.log(id, ' id received in jwt strategy');
      const user = await this.sharedService.getProfile({ id: id });
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      console.log('this error was thrown from jwt strategy', error.message);
    }
  }
}
