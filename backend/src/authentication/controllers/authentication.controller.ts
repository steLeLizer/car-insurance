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
} from '../../util';
import { SkipThrottle } from '@nestjs/throttler';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('register')
  @Public()
  @ApiBody({ type: AuthenticationDto })
  @ApiCreatedResponse({
    description: 'User registration',
  })
  @ApiConflictResponse({
    description: 'User already exists',
  })
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: AuthenticationDto): Promise<TokensType> {
    return this.authenticationService.register(dto);
  }

  @Post('login')
  @Public()
  @ApiBody({ type: AuthenticationDto })
  @ApiOkResponse({ description: 'User login' })
  @ApiUnauthorizedResponse({ description: 'Credentials incorrect' })
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: AuthenticationDto): Promise<TokensType> {
    return this.authenticationService.login(dto);
  }

  @Post('logout')
  @SkipThrottle()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User logout' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string) {
    return this.authenticationService.logout(userId);
  }

  @Post('refresh')
  @Public()
  @UseGuards(RefreshTokenGuard)
  @SkipThrottle()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Tokens refresh' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authenticationService.refreshTokens(userId, refreshToken);
  }
}
