import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { CreateUserDto } from '../models/user/dto/create-user.dto';
import { User } from '../models/user/entities/user.entity';
import { UserService } from '../models/user/user.service';
import { AuthService } from './auth.service';
import { Roles } from './decorators/roles.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Role } from './role.enum';

@ApiExcludeController()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UserService,

    private readonly authService: AuthService,
  ) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }

  @Post('logout')
  logout(): void {
    // TODO: implement
  }
}
