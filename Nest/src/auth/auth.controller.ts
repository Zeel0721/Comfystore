import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from 'src/DTO/login.dto';
import { LocalGuard } from 'src/utils/LocalGuard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Body() login: LoginDto) {
    return login.username;
  }

  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session.id);
    session.authenticated = true;
    return session;
  }
}
