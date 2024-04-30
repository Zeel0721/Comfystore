import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import UserDto from 'src/DTO/user.dto';
import { User } from 'src/schema/user';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async addUser(createUserDto: UserDto) {
    const password = encodePassword(createUserDto.password);
    const user = new this.userModel({ ...createUserDto, password });
    await user.save();
    return await this.userModel.find();
  }
  async findUserByUsername(username: string) {
    return await this.userModel.findOne({ username });
  }
}
