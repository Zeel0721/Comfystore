import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { LocalStartegy } from './utils/local.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModel } from 'src/schema/user';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { token } from 'src/token';
import { JwtStrategy } from './utils/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserModel }]),
    PassportModule,
    JwtModule.register({
      secret: token.JWT_SECRET,
    }),
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
  ],
})
export class AuthModule {}
