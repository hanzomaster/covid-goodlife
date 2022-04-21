import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return this.userRepository.create(createUserDto);
    } catch (e) {
      throw new InternalServerErrorException(e, 'failed - create user');
    }
  }

  async findByUserName(username: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({ username });
    } catch (e) {
      throw new InternalServerErrorException(e, 'failed - find by username');
    }
  }

  async findById(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({ id });
    } catch (e) {
      throw new InternalServerErrorException(e, 'failed - find by user id');
    }
  }
  async remove(id: number): Promise<void> {
    try {
      await this.userRepository.delete(id);
    } catch (e) {
      throw new InternalServerErrorException(e, 'failed - delete user');
    }
  }
}
