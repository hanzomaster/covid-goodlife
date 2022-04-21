import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { encodedPassword } from '../../utils/argon2';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const password = await encodedPassword(createUserDto.password);
    try {
      const newUser = this.userRepository.create({
        ...createUserDto,
        password,
      });
      return await this.userRepository.save(newUser);
    } catch (e) {
      throw new InternalServerErrorException('failed - create user');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (e) {
      throw new InternalServerErrorException('failed - find all users');
    }
  }

  async findByUserName(username: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({ username });
    } catch (e) {
      throw new InternalServerErrorException('failed - find by username');
    }
  }

  async findById(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({ id });
    } catch (e) {
      throw new InternalServerErrorException('failed - find by user id');
    }
  }
  async remove(id: number): Promise<void> {
    try {
      await this.userRepository.delete(id);
    } catch (e) {
      throw new InternalServerErrorException('failed - delete user');
    }
  }
}
