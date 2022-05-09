import { CarService } from '../../services';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CarModule } from '../../car.module';
import { Test, TestingModule } from '@nestjs/testing';
import { Car } from '../../schemas';

const newCarMockData = {
  name: 'VOLKSWAGEN',
  price: 300,
  universalPercentage: 0.5,
  highRisk: false,
};

describe('CarService Int', () => {
  let carService: CarService;
  let newCar: Car;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.TEST_DB_URI),
        CarModule,
      ],
    }).compile();

    carService = moduleRef.get(CarService);
    await carService.deleteAllCars();
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  describe('createCar()', () => {
    it('should create car', async () => {
      newCar = await carService.createCar(newCarMockData);

      expect(newCar.name).toBe(newCarMockData.name);
    });

    it('should throw on duplicate name', async () => {
      try {
        await carService.createCar(newCarMockData);
      } catch (error) {
        expect(error.status).toBe(409);
      }
    });
  });

  describe('getCars()', () => {
    it('should get cars', async () => {
      const cars = await carService.getCars();

      expect(cars.toString()).toContain(newCarMockData.name);
    });
  });

  describe('getCarById()', () => {
    it('should get car by id', async () => {
      const car = await carService.getCarById(newCar.carId);

      expect(car.carId).toBe(newCar.carId);
    });
  });

  describe('getCarByName()', () => {
    it('should get car by name', async () => {
      const car = await carService.getCarByName(newCar.name);

      expect(car.name).toBe(newCar.name);
    });
  });
});
