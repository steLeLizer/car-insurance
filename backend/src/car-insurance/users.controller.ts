import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { CreateUserInterface, UpdateUserInterface } from './interfaces';

import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Post()
  async createUser(
    @Body() createUserInterface: CreateUserInterface,
  ): Promise<User> {
    return this.usersService.createUser(
      createUserInterface.email,
      createUserInterface.password,
    );
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserBody: UpdateUserInterface,
  ): Promise<User> {
    return this.usersService.updateUser(userId, updateUserBody);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.deleteUser(userId);
  }
}
