import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const userObj = user.toObject();
      delete userObj.password;
      return userObj;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, id: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(user: any) {
    return user;
  }
}
