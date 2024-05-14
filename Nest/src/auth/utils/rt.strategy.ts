import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { token } from '../../token';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefresh extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(token.AUTH_SERVICE) private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: token.JWT_SECRET,
      passReqToCallback: true,
    });
  }
  async validate(req: Request, payload: any) {
    const refresh = req.get('Authorization').replace('Bearer', '').trim();
    const { username } = payload;
    const { accessToken, refreshToken } = await this.authService.refreshToken(
      refresh,
      username,
    );
    return { accessToken, refreshToken };
  }
}
