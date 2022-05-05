import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { Car, CarDocument } from '../schemas';

@Injectable()
export class CarRepository {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

  async findOne(carFilterQuery: FilterQuery<Car>): Promise<Car> {
    return this.carModel.findOne(carFilterQuery);
  }

  async find(carsFilterQuery: FilterQuery<Car>): Promise<Car[]> {
    return this.carModel.find(carsFilterQuery);
  }

  async create(car: Car): Promise<Car> {
    const newCar = new this.carModel(car);
    return newCar.save();
  }

  async cleanDatabase() {
    return this.carModel.deleteMany();
  }
}
