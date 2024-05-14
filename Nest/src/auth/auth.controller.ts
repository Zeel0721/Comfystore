import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LoginDto } from '../DTO/login.dto';
import { Public } from '../global.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request, @Body() login: LoginDto) {
    return req.user;
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('')
  get(@Req() req: Request) {
    return req.user;
  }
  @UseGuards(AuthGuard('jwt-refresh'))
  @Get('refresh')
  refresh(@Req() req: Request) {
    return req.user;
  }
}
