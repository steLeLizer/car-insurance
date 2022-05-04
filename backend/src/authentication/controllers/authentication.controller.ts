import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from '../services';
import { AuthenticationDto } from '../dto';
import { TokensType } from '../types';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
  RefreshTokenGuard,
} from '../../utils';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: AuthenticationDto): Promise<TokensType> {
    return this.authenticationService.register(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: AuthenticationDto): Promise<TokensType> {
    return this.authenticationService.login(dto);
  }

  @SkipThrottle()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string) {
    return this.authenticationService.logout(userId);
  }

  @SkipThrottle()
  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authenticationService.refreshTokens(userId, refreshToken);
  }
}
