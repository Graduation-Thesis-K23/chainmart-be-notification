import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
    } catch (error) {
      console.error(error);
      throw new RpcException('Cannot create user');
    }
  }

  async findUserByUsername(username: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username,
        },
      });
      console.log('User from username:', user);
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  async findUserBySyncId(sync_id: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          sync_id,
        },
      });
      console.log('User from sync_id:', user);
      return user;
    } catch (error) {
      console.error(error);
    }
  }
}
