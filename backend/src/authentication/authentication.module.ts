import { Module } from '@nestjs/common';
import { AuthenticationService } from './services';
import { AuthenticationController } from './controllers';
import { CarInsuranceDbModule } from '../car-insurance-db/car-insurance-db.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
  imports: [CarInsuranceDbModule, JwtModule.register({})],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthenticationModule {}
