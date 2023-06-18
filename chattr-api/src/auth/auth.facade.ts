import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './signup.dto';
import { AuthDto } from './auth.dto';
import { Prisma } from '@prisma/client';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthFacade {
  constructor(private authService: AuthService) { }

  async signUp(credentials: SignupDto): Promise<string> {
    return await this.authService.signUp(credentials as Prisma.UserCreateInput);
  }

  async signIn(credentials: LoginDto): Promise<AuthDto> {
    return await this.authService.signIn(credentials as Prisma.UserCreateInput);
  }

}
