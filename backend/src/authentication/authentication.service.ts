import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticationDto } from './dto';
import { UsersService } from '../car-insurance/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokensType } from './types';
import { hash } from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: AuthenticationDto): Promise<TokensType> {
    const { email, password } = dto;

    const hash = await this.hashData(password);
    const user = await this.usersService.getUserByEmail(email);

    if (user) throw new ConflictException('User already exists.');

    const newUser = await this.usersService.createUser(email, hash);

    const tokens = await this.signUser(newUser.userId, newUser.email);
    await this.updateRefreshTokenHash(newUser.userId, tokens.refreshToken);
    return tokens;
  }

  async login(dto: AuthenticationDto): Promise<TokensType> {
    const { email, password } = dto;

    const user = await this.usersService.getUserByEmail(email);

    if (!user) throw new UnauthorizedException('Credentials incorrect.');

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('Credentials incorrect.');

    const tokens = await this.signUser(user.userId, user.email);
    await this.updateRefreshTokenHash(user.userId, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    const user = await this.usersService.getUserById(userId);

    if (!user || !user.hashedRefreshToken) return;

    return await this.updateRefreshTokenHash(userId, null);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    console.log(userId);
    const user = await this.usersService.getUserById(userId);

    if (!user) throw new ForbiddenException('Access denied.');

    console.log(refreshToken);

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access denied.');

    const tokens = await this.signUser(user.userId, user.email);
    await this.updateRefreshTokenHash(user.userId, tokens.refreshToken);
    return tokens;
  }

  async signUser(userId: string, email: string): Promise<TokensType> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.REFRESH_TOKEN_SECRET,
          expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  hashData(data: string) {
    return bcrypt.hash(data, Number(process.env.BCRYPT_SALT_ROUNDS));
  }

  async updateRefreshTokenHash(userId: string, refreshToken: string) {
    let hash = refreshToken;

    if (refreshToken) hash = await this.hashData(refreshToken);

    await this.usersService.updateUser(userId, { hashedRefreshToken: hash });
  }
}
