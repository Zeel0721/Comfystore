import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';
import UserDto from 'src/DTO/user.dto';
import { token } from 'src/token';
import { Public } from 'src/global.decorator';

@Controller('user')
export class UserController {
  constructor(
    @Inject(token.USER_SERVICE) private readonly userService: UserService,
  ) {}

  @Public()
  @Post('signup')
  addUser(@Body() createUserDto: UserDto) {
    return this.userService.addUser(createUserDto);
  }
}
