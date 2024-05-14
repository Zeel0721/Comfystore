import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LocalStartegy } from './utils/local.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModel } from '../schema/user';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { token } from '../token';
import { JwtStrategy } from './utils/jwt.strategy';
import { JwtRefresh } from './utils/rt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserModel }]),
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: token.AUTH_SERVICE,
      useClass: AuthService,
    },
    {
      provide: token.USER_SERVICE,
      useClass: UserService,
    },
    LocalStartegy,
    JwtStrategy,
    JwtRefresh,
  ],
})
export class AuthModule {}
