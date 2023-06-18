import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { AuthDto } from './auth.dto';
import { errorMessages } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signUp(data: Prisma.UserCreateInput): Promise<string> {
    const hash = await bcrypt.hash(data.password, 10);

    try {
      const user = await this.usersService.createUser({
        ...data,
        password: hash,
      });
      return user.username;
    } catch (err) {
      throw new ConflictException(errorMessages.usernameTaken);
    }
  }

  async signIn(data: Prisma.UserCreateInput): Promise<AuthDto> {
    const user = await this.usersService.user({ username: data.username });
    if (!user) {
      throw new UnauthorizedException(errorMessages.invalidCredentials);
    }

    const match = await bcrypt.compare(data.password, user?.password);
    if (!match) {
      throw new UnauthorizedException(errorMessages.invalidCredentials);
    }

    return {
      userId: user.id,
      username: user.username,
      accessToken: await this.jwtService.signAsync({ username: user.username, sub: user.id }),
    };
  }

}
