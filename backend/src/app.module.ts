import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';

import { AccessTokenGuard } from './util';
import { UserModule } from './user/user.module';
import { CarModule } from './car/car.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { RuleModule } from './rule/rule.module';
import { OfferModule } from './offer/offer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URI),
    ThrottlerModule.forRoot({
      ttl: Number(process.env.THROTTLER_TTL),
      limit: Number(process.env.THROTTLER_LIMIT),
    }),
    UserModule,
    AuthenticationModule,
    CarModule,
    RuleModule,
    OfferModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
