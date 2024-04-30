import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UserService,
  ) {}

  async validateUser(username: string, password: string) {
    const userDB = await this.userService.findUserByUsername(username);
    if (userDB && userDB.password === password) {
      console.log(userDB);
      return userDB;
    } else {
      console.error('not found');
      return null;
    }
  }
}
