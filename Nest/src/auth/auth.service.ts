import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { token } from '../token';
import { UserService } from '../user/user.service';
import { comparePasswords } from '../auth/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(token.USER_SERVICE) private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const userDB = (
      await this.userService.findUserByUsername(username)
    ).toObject();
    if (userDB) {
      const match =
        comparePasswords(password, userDB.password) ||
        password === userDB.password;
      if (match) {
        const accessToken = this.jwtService.sign(
          { username: userDB.username },
          { expiresIn: '30s' },
        );
        const refreshToken = this.jwtService.sign(
          {
            username: userDB.username,
            password: userDB.password,
          },
          { expiresIn: '1d' },
        );
        return {
          accessToken,
          refreshToken,
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
