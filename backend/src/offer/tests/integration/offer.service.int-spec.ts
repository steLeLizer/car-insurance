import { Test, TestingModule } from '@nestjs/testing';
import { OfferService } from '../../services';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RuleModule } from '../../../rule/rule.module';
import { CarModule } from '../../../car/car.module';
import { RuleService } from '../../../rule/services';
import { CarService } from '../../../car/services';
import { OfferModule } from '../../offer.module';
import { CreateCarInterface } from '../../../car/interfaces';
import { CreateRuleInterface } from '../../../rule/interfaces';
import { RuleTypeEnum } from '../../../rule/enums';
import { CarInsuranceOfferRequestDto } from '../../dtos';

const computeCarInsuranceOfferMockData = {
  carPrice: 300,
  carUniversalPercentage: 0.5,
};

const newCarMockData: CreateCarInterface = {
  name: 'VOLKSWAGEN',
  price: 300,
  universalPercentage: 0.5,
  highRisk: false,
};

const newRuleMockData: CreateRuleInterface = {
  type: RuleTypeEnum.Car,
  priceMin: 5000,
  driverAgeMin: 18,
  highRiskDriverAgeMin: 25,
};

const newCarInsuranceOfferMockData: CarInsuranceOfferRequestDto = {
  carName: newCarMockData + 'A',
  driverAge: newRuleMockData.driverAgeMin - 1,
  purchasePrice: newRuleMockData.priceMin - 1,
  ruleType: RuleTypeEnum.House,
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

    await carService.deleteAllCars();
    await ruleService.deleteAllRules();

    await carService.createCar(newCarMockData);
    await ruleService.createRule(newRuleMockData);
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
    it(`should throw new NotFoundException('Rule not found')`, async () => {
      try {
        await offerService.carInsuranceOffer(newCarInsuranceOfferMockData);
      } catch (error) {
        expect(error.status).toBe(404);
        expect(error.message).toBe('Rule not found');
        newCarInsuranceOfferMockData.ruleType = newRuleMockData.type;
      }
    });

    it(`should throw new NotFoundException('Car not found')`, async () => {
      try {
        await offerService.carInsuranceOffer(newCarInsuranceOfferMockData);
      } catch (error) {
        expect(error.status).toBe(404);
        expect(error.message).toBe('Car not found');
      }
    });

    it(`should throw new ConflictException('Sorry, the price of the car is too low')`, async () => {
      try {
        newCarInsuranceOfferMockData.carName = newCarMockData.name;
        await offerService.carInsuranceOffer(newCarInsuranceOfferMockData);
      } catch (error) {
        expect(error.status).toBe(409);
        expect(error.message).toBe('Sorry, the price of the car is too low');
        newCarInsuranceOfferMockData.purchasePrice = newRuleMockData.priceMin;
      }
    });

    it(`should throw new ConflictException('Sorry, the driver is too young')`, async () => {
      try {
        await offerService.carInsuranceOffer(newCarInsuranceOfferMockData);
      } catch (error) {
        expect(error.status).toBe(409);
        expect(error.message).toBe('Sorry, the driver is too young');
        newCarInsuranceOfferMockData.driverAge = newRuleMockData.driverAgeMin;
      }
    });

    it(`should throw new ConflictException('Sorry, we cannot accept this particular risk')`, async () => {
      const car = newCarMockData;
      car.highRisk = true;

      await carService.deleteAllCars();
      await carService.createCar(car);

      try {
        const offer = newCarInsuranceOfferMockData;
        offer.driverAge = 24;
        await offerService.carInsuranceOffer(offer);
      } catch (error) {
        expect(error.status).toBe(409);
        expect(error.message).toBe(
          'Sorry, we cannot accept this particular risk',
        );
        newCarInsuranceOfferMockData.driverAge =
          newRuleMockData.highRiskDriverAgeMin;
      }
    });

    it('should return offer', async () => {
      const result = await offerService.carInsuranceOffer(
        newCarInsuranceOfferMockData,
      );

      expect(result.yearly.globalOffer).toEqual(300);
      expect(result.yearly.universalOffer).toEqual(450);
      expect(result.monthly.globalOffer).toEqual(25);
      expect(result.monthly.universalOffer).toEqual(37.5);
    });
  });
});
