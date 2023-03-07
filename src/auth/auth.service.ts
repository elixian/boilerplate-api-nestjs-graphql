import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private userService : UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUser(email);
    if (user && user.Password === password) {
      const { Password, ...result } = user;
      return result;
    }
    return null;
  }
}
