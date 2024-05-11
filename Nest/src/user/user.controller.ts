import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';
import UserDto from 'DTO/user.dto';
import { token } from 'token';
import { Public } from 'global.decorator';

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
