import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserDto from 'src/DTO/user.dto';
import { User } from 'src/schema/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async addUser(createUserDto: UserDto) {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return await this.userRepository.find();
  }
}
