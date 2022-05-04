import { Controller, Get, Param } from '@nestjs/common';

import { User } from '../schemas';
import { UserService } from '../services';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SkipThrottle()
  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @SkipThrottle()
  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.userService.getUserById(userId);
  }
}
