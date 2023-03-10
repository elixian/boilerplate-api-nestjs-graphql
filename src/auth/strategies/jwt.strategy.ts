import { ConfigService } from '@nestjs/config';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService : ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any):Promise<JwtPayload> {

    return { ID: payload.sub, email: payload.username };
  }
}
