import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStartegy } from '../utils/LocalStrategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModel } from 'src/schema/user';
import { SessionSerializer } from 'src/utils/SessionSerializer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserModel }]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UserService,
    },
    LocalStartegy,
    SessionSerializer,
  ],
})
export class AuthModule {}
