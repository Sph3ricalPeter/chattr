import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthFacade } from './auth.facade';
import { AuthDto } from './auth.dto';
import { SignupDto } from './signup.dto';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authFacade: AuthFacade) { }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(@Body() credentials: SignupDto): Promise<string> {
    return this.authFacade.signUp(credentials);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() credentials: LoginDto): Promise<AuthDto> {
    return this.authFacade.signIn(credentials);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
