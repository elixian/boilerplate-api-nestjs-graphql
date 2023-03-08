import { UserEntity } from 'src/user/models/user.model';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { AuthLoginOutPut } from './dto/auth.login.dto';
import { JwtService } from '@nestjs/jwt';


interface JWTPayload{
  username,
  sub
}
@Injectable()
export class AuthService {
  constructor(
    private userService : UserService,
    private jwtService: JwtService
    ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUser(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserEntity): Promise<AuthLoginOutPut>{
    const payload: JWTPayload = { username: user.name, sub: user.ID };
    return {
      accessToken : this.jwtService.sign(payload),
    }
  }
}
