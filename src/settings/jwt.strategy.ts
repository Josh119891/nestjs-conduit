import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { secretKey } from './index';
import { UserService } from 'src/core/user/user.service';
import { UserEntity } from 'src/entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService:UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
      ignoreExpiration: false,
      secretOrKey: secretKey,
    });
  }

  async validate(payload: any):Promise<UserEntity> {
    const user = await this.userService.findByUsername(payload.username);
    return user;
  }
}
