import { Module } from '@nestjs/common';
import { AuthenticationService } from './services';
import { AuthenticationController } from './controllers';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
  imports: [UserModule, JwtModule.register({})],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
