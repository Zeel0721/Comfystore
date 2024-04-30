import { Module } from '@nestjs/common';
import { userModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import entities from './schema';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'ComfyStore',
      entities: entities,
      synchronize: true,
    }),
    userModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
