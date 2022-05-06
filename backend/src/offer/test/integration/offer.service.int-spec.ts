import { Test, TestingModule } from '@nestjs/testing';
import { OfferService } from '../../services';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RuleModule } from '../../../rule/rule.module';
import { CarModule } from '../../../car/car.module';
import { RuleService } from '../../../rule/services';
import { CarService } from '../../../car/services';
import { OfferModule } from '../../offer.module';

const computeCarInsuranceOfferMockData = {
  carPrice: 300,
  carUniversalPercentage: 0.5,
};

describe('Car Insurance Offer Calculation', () => {
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

    await carService.cleanDatabase();
    await ruleService.cleanDatabase();

    // TODO
    // create car and rule
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  describe('computeCarInsuranceOffer()', () => {
    it('should return offer', async () => {
      const result = await offerService.computeCarInsuranceOffer(
        computeCarInsuranceOfferMockData.carPrice,
        computeCarInsuranceOfferMockData.carUniversalPercentage,
      );

      expect(result.yearly.globalOffer).toEqual(300);
      expect(result.yearly.universalOffer).toEqual(450);
      expect(result.monthly.globalOffer).toEqual(25);
      expect(result.monthly.universalOffer).toEqual(37.5);
    });
  });

  describe('carInsuranceOffer()', () => {
    it('', async () => {});
  });
});
