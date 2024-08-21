import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { token } from '../token';
import { comparePasswords, encodePassword } from '../auth/utils/bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findUserByName(username: string) {
    return (await this.userModel.findOne({ username })).toObject();
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string; user: string }> {
    const userDB = await this.findUserByName(username);
    if (userDB) {
      const match = comparePasswords(password, userDB.password);
      if (match) {
        return this.generateTokens(userDB);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async refreshToken(refresh: string, username: string) {
    const userDB = await this.findUserByName(username);
    const user = comparePasswords(refresh, userDB.hashedRt);
    if (!user) return null;
    return this.generateTokens(userDB);
  }
  async generateTokens(userDB: { password: string; username: string }) {
    const accessToken = this.jwtService.sign(
      { username: userDB.username },
      { secret: token.JWT_SECRET, expiresIn: 30 },
    );
    const refreshToken = this.jwtService.sign(
      { username: userDB.username },
      { secret: token.JWT_SECRET, expiresIn: 60 * 60 * 24 },
    );
    const hashedRt = encodePassword(refreshToken);
    const change = await this.userModel.updateOne(
      { username: userDB.username },
      { hashedRt },
    );
    return {
      accessToken,
      refreshToken,
      user: userDB.username,
    };
  }
}
