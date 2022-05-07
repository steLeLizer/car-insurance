import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { CarService } from '../services';

@Injectable()
export class CarSeeder {
  constructor(private readonly carService: CarService) {}

  @Command({
    command: 'db:seed:cars',
    describe: 'seed cars',
  })
  async create() {
    await this.carService.cleanDatabase();
    await this.carService.createCar({
      name: 'AUDI',
      price: 250,
      universalPercentage: 0.3,
      highRisk: false,
    });
    await this.carService.createCar({
      name: 'BMW',
      price: 150,
      universalPercentage: 0.4,
      highRisk: false,
    });
    await this.carService.createCar({
      name: 'PORSCHE',
      price: 500,
      universalPercentage: 0.7,
      highRisk: true,
    });
  }
}
