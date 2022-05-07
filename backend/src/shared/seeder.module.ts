import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { UserModule } from '../user/user.module';
import { RuleModule } from '../rule/rule.module';
import { CarModule } from '../car/car.module';
import { UserSeeder } from '../user/seeders';
import { RuleSeeder } from '../rule/seeders';
import { CarSeeder } from '../car/seeders';
import { AuthenticationModule } from '../authentication/authentication.module';
import { AllSeeder } from './seeders';

@Module({
  imports: [
    CommandModule,
    AuthenticationModule,
    UserModule,
    RuleModule,
    CarModule,
  ],
  providers: [AllSeeder, UserSeeder, RuleSeeder, CarSeeder],
  exports: [AllSeeder, UserSeeder, RuleSeeder, CarSeeder],
})
export class SeederModule {}
