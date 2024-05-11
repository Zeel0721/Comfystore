import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserModel } from 'schema/user';
import { MongooseModule } from '@nestjs/mongoose';
import { token } from 'token';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserModel,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: token.USER_SERVICE,
      useClass: UserService,
    },
  ],
})
export class userModule {}
