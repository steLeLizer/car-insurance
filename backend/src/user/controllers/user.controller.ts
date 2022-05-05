import { Controller, Get, Param } from '@nestjs/common';

import { User } from '../schemas';
import { UserService } from '../services';
import { SkipThrottle } from '@nestjs/throttler';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @SkipThrottle()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Get users' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':userId')
  @SkipThrottle()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Get user' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.userService.getUserById(userId);
  }
}
