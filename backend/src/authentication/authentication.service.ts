import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationInterface } from './interfaces';
import { UsersService } from '../car-insurance/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signInLocal(authenticationBody: AuthenticationInterface) {
    const user = await this.usersService.getUserByEmail(
      authenticationBody.email,
    );

    if (!user) throw new UnauthorizedException('Credentials incorrect.');

    if (user.password !== authenticationBody.password)
      throw new UnauthorizedException('Credentials incorrect.');

    return this.signUser(user.userId, user.email);
  }

  signUser(userId: string, email: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
    });
  }
}
