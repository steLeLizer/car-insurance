import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUpdateCarInterface } from '../interfaces';

import { Car } from '../schemas';
import { CarRepository } from '../repositories';

@Injectable()
export class CarService {
  constructor(private readonly carRepository: CarRepository) {}

  async getCarById(carId: string): Promise<Car> {
    if (!(await this.carRepository.findOne({ carId })))
      throw new NotFoundException('Car not found');

    return this.carRepository.findOne({ carId });
  }

  async getCarByName(car: string): Promise<Car> {
    return this.carRepository.findOne({ car });
  }

  async getCars(): Promise<Car[]> {
    return this.carRepository.find({});
  }

  async createCar(body: CreateUpdateCarInterface): Promise<Car> {
    const { name, price, percentage } = body;

    if (await this.getCarByName(name))
      throw new ConflictException('Car already exists');

    return this.carRepository.create({
      carId: uuidv4(),
      name,
      price,
      percentage,
    });
  }

  async cleanDatabase() {
    return this.carRepository.cleanDatabase();
  }
}
