import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationDto } from './dto';
import { TokensType } from './types';
import {
  AccessTokenAuthGuard,
  GetCurrentUser,
  GetCurrentUserById,
  RefreshTokenAuthGuard,
} from '../utils';

@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: AuthenticationDto): Promise<TokensType> {
    return this.authenticationService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: AuthenticationDto): Promise<TokensType> {
    return this.authenticationService.login(dto);
  }

  @UseGuards(AccessTokenAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserById() userId: string) {
    return this.authenticationService.logout(userId);
  }

  @UseGuards(RefreshTokenAuthGuard)
  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserById() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authenticationService.refreshTokens(userId, refreshToken);
  }
}
