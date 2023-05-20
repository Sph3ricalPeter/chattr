import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signUp(username: string, pass: string) {
        const hash = await bcrypt.hash(pass, 10);

        try {
            const user = await this.usersService.createUser({
                username: username,
                password: hash,
            });
            return user.username;
        } catch (err) {
            throw new ConflictException();
        }
    }

    async signIn(username: string, pass: string) {
        const user = await this.usersService.user({ username: username });
        if (!user) {
            throw new UnauthorizedException();
        }

        const match = await bcrypt.compare(pass, user?.password);
        if (!match)  {
            throw new UnauthorizedException();
        }
        
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
