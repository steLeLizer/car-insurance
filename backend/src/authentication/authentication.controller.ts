import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationInterface } from './interfaces';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('local/signin')
  signInLocal(@Body() authenticationBody: AuthenticationInterface) {
    return this.authenticationService.signInLocal(authenticationBody);
  }
}
