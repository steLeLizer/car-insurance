import { Controller, Get, Param } from '@nestjs/common';

import { User } from '../schemas';
import { UsersService } from '../services';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @SkipThrottle()
  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @SkipThrottle()
  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }
}
