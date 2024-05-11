import { Inject, Injectable, Req } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { token } from 'token';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(token.AUTH_SERVICE) private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: token.JWT_SECRET,
    });
  }
  async validate(payload: any) {
    if (!payload.password) return payload;
    const { username, password } = payload;
    const { accessToken } = await this.authService.validateUser(
      username,
      password,
    );
    return accessToken;
  }
}
