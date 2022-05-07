import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UserService } from '../services';
import { AuthenticationService } from '../../authentication/services';

@Injectable()
export class UserSeeder {
  constructor(
    private readonly userService: UserService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Command({
    command: 'db:seed:users',
    describe: 'seed users',
  })
  async create() {
    await this.userService.cleanDatabase();

    const password = await this.authenticationService.hashData('Ninja');

    await this.userService.createUser({
      email: 'qover@gmail.com',
      password,
    });
  }
}
