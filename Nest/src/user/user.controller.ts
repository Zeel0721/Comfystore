import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';
import UserDto from 'src/DTO/user.dto';
import { token } from 'src/token';

@Controller('user')
export class UserController {
  constructor(
    @Inject(token.USER_SERVICE) private readonly userService: UserService,
  ) {}

  @Post('signup')
  addUser(@Body() createUserDto: UserDto) {
    return this.userService.addUser(createUserDto);
  }
}
