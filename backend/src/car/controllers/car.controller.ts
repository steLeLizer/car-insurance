import { Controller, Get, Param } from '@nestjs/common';

import { Car } from '../schemas';
import { CarService } from '../services';
import { SkipThrottle } from '@nestjs/throttler';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  @SkipThrottle()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Get cars' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getCars(): Promise<Car[]> {
    return this.carService.getCars();
  }

  @Get(':carId')
  @SkipThrottle()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Get car' })
  @ApiNotFoundResponse({ description: 'Car not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getUser(@Param('carId') carId: string): Promise<Car> {
    return this.carService.getCarById(carId);
  }
}
