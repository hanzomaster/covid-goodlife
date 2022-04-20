import { IsAlphanumeric, IsEnum, IsOptional, MinLength } from 'class-validator';
import { Role } from '../../../auth/role.enum';

export class CreateUserDto {
  @IsAlphanumeric()
  username: string;

  @MinLength(8)
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;
}
