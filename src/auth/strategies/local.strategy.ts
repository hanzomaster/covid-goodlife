import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super(); // config
  }

  async validate(username: string, password: string): Promise<any> {
    const authenticated = await this.authService.validateUser(
      username,
      password,
    );
    if (!authenticated) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return Promise.resolve(authenticated);
  }
}
