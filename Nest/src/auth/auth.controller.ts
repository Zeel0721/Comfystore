import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LoginDto } from 'DTO/login.dto';
import { JwtGuard, LocalGuard } from 'auth/utils/local.guard';
import { Public } from 'global.decorator';

@Controller('auth')
export class AuthController {
  @Public()
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
  @UseGuards(JwtGuard)
  @Get('refresh')
  refresh(@Req() req: Request) {
    return req.user;
  }
}
