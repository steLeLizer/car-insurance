import { Controller, Get, Param } from '@nestjs/common';

import { Car } from '../schemas';
import { CarService } from '../services';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @SkipThrottle()
  @Get()
  async getCars(): Promise<Car[]> {
    return this.carService.getCars();
  }

  @SkipThrottle()
  @Get(':carId')
  async getUser(@Param('carId') carId: string): Promise<Car> {
    return this.carService.getCarById(carId);
  }
}
