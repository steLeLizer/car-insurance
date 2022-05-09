import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateCarInterface } from '../interfaces';

import { Car } from '../schemas';
import { CarRepository } from '../repositories';

@Injectable()
export class CarService {
  constructor(private readonly carRepository: CarRepository) {}

  async getCarById(carId: string): Promise<Car> {
    const car = await this.carRepository.findOne({ carId });

    if (!car) throw new NotFoundException('Car not found');

    return car;
  }

  async getCarByName(name: string): Promise<Car> {
    return this.carRepository.findOne({ name });
  }

  async getCars(): Promise<Car[]> {
    return this.carRepository.find({});
  }

  async createCar(body: CreateCarInterface): Promise<Car> {
    const { name, price, universalPercentage, highRisk } = body;

    if (await this.getCarByName(name))
      throw new ConflictException('Car already exists');

    return this.carRepository.create({
      carId: uuidv4(),
      name,
      price,
      universalPercentage,
      highRisk,
    });
  }

  async deleteAllCars() {
    return this.carRepository.cleanCollection();
  }
}
