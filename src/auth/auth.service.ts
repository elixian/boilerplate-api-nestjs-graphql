import { UserEntity } from 'src/user/models/user.model';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { AuthLoginOutPut } from './dto/auth.login.dto';

@Injectable()
export class AuthService {
  constructor(private userService : UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUser(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserEntity): Promise<AuthLoginOutPut>{
    return {
      accessToken : 'fake_token'
    }
  }
}
