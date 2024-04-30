import { Module } from '@nestjs/common';
import { userModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/ComfyStore'),
    PassportModule.register({ session: true }),
    userModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
