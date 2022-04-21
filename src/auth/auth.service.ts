import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user/entities/user.entity';
import { UserService } from '../models/user/user.service';
import { comparePassword } from '../utils/argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUserName(username);
    if (user && (await comparePassword(pass, user.password))) {
      delete user.password;
      delete user.createdAt;
      return Promise.resolve(user);
    }
    return null;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
