import { CarService } from '../../services';
import { AppModule } from '../../../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { Car } from '../../schemas';

const newCarMockData = {
  name: 'Volkswagen',
  price: 300,
  percentage: 0.5,
};

describe('CarService Int', () => {
  let carService: CarService;
  let newCar: Car;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    carService = moduleRef.get(CarService);
    await carService.cleanDatabase();
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

  describe('getUserById()', () => {
    it('should get user by id', async () => {
      const car = await carService.getCarById(newCar.carId);

      expect(car.carId).toBe(newCar.carId);
    });
  });

  describe('getCarByName()', () => {
    it('should get user by car', async () => {
      const car = await carService.getCarByName(newCar.name);

      expect(car.name).toBe(newCar.name);
    });
  });
});
