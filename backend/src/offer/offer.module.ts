import { Module } from '@nestjs/common';
import { RuleModule } from '../rule/rule.module';
import { OfferService } from './services';
import { OfferController } from './controllers';
import { CarModule } from '../car/car.module';

@Module({
  imports: [RuleModule, CarModule],
  controllers: [OfferController],
  providers: [OfferService],
})
export class OfferModule {}
