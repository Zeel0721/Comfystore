import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import UserDto from 'src/DTO/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  addUser(@Body() createUserDto: UserDto) {
    return this.userService.addUser(createUserDto);
  }
}
