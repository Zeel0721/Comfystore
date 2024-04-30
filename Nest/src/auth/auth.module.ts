import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStartegy } from '../utils/LocalStrategy';
import { MongooseModule } from '@nestjs/mongoose';
import { userModule } from 'src/user/user.module';
import { User, UserModel } from 'src/schema/user';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserModel }]),
    PassportModule,
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
  ],
})
export class AuthModule {}
