import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByUsername(username);
    const salt = await bcrypt.genSalt(10);
    const pwd = await bcrypt.hash(password, salt);
    if (user && user.password === pwd) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
