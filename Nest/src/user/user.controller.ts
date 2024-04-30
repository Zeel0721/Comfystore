import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';
import UserDto from 'src/DTO/user.dto';

@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UserService,
  ) {}

  @Post('signup')
  addUser(@Body() createUserDto: UserDto) {
    return this.userService.addUser(createUserDto);
  }
}
