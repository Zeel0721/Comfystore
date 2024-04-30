import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UserService,
  ) {}

  async validateUser(username: string, password: string) {
    const userDB = await this.userService.findUserByUsername(username);
    if (userDB) {
      const match = comparePasswords(password, userDB.password);
      if (match) {
        return userDB;
      } else {
        console.error('Passwords do not match');
        return null;
      }
    } else {
      console.error('not found');
      return null;
    }
  }
}
