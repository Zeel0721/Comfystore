import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LoginDto } from 'src/DTO/login.dto';
import {
  JwtGuard,
  LocalGuard,
  RefreshJwtGuard,
} from 'src/auth/utils/local.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Req() req: Request, @Body() login: LoginDto) {
    return req.user;
  }
  @UseGuards(JwtGuard)
  @Get('')
  get(@Req() req: Request) {
    return req.user;
  }
  @UseGuards(RefreshJwtGuard)
  @Get('refresh')
  refresh(@Req() req: Request) {
    return req.user;
  }
}
