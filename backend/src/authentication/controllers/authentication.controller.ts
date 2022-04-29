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
  GetCurrentUserById,
  Public,
  RefreshTokenGuard,
} from '../../utils';

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

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserById() userId: string) {
    return this.authenticationService.logout(userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserById() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authenticationService.refreshTokens(userId, refreshToken);
  }
}
