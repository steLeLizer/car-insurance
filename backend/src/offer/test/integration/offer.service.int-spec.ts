import { Test, TestingModule } from '@nestjs/testing';
import { OfferService } from '../../services';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RuleModule } from '../../../rule/rule.module';
import { CarModule } from '../../../car/car.module';
import { RuleService } from '../../../rule/services';
import { CarService } from '../../../car/services';
import { OfferModule } from '../../offer.module';

const offerMockData = {};

describe('Authentication Flow', () => {
  let ruleService: RuleService;
  let carService: CarService;
  let offerService: OfferService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.TEST_DB_URI),
        RuleModule,
        CarModule,
        OfferModule,
      ],
    }).compile();

    ruleService = moduleRef.get(RuleService);
    carService = moduleRef.get(CarService);
    offerService = moduleRef.get(OfferService);
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  describe('computeCarInsuranceOffer()', () => {
    it('', async () => {});
  });

  describe('carInsuranceOffer()', () => {
    it('', async () => {});
  });
});
