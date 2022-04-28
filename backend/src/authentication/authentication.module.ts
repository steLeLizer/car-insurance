import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { CarInsuranceModule } from '../car-insurance/car-insurance.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CarInsuranceModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('ACCESS_TOKEN_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('ACCESS_TOKEN_EXPIRATION'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
