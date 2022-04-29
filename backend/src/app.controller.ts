import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AccessTokenAuthGuard } from './utils';
import { GetCurrentUserById } from './utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AccessTokenAuthGuard)
  @Get()
  getHello(@GetCurrentUserById() userId: string): string {
    return this.appService.getHello(userId);
  }
}
