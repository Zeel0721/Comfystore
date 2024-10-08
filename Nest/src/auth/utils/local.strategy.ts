import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { token } from '../../token';

@Injectable()
export class LocalStartegy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @Inject(token.AUTH_SERVICE) private readonly authService: AuthService,
  ) {
    super();
  }
  async validate(username: string, password: string) {
    const { accessToken, refreshToken, user } =
      await this.authService.validateUser(username, password);
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    return { accessToken, refreshToken, user };
  }
}
