import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { CarInsuranceModule } from '../car-insurance/car-insurance.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
  imports: [CarInsuranceModule, JwtModule.register({})],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthenticationModule {}
