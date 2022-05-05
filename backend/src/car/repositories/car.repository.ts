import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { Car, CarDocument } from '../schemas';

@Injectable()
export class CarRepository {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

  async findOne(userFilterQuery: FilterQuery<Car>): Promise<Car> {
    return this.carModel.findOne(userFilterQuery);
  }

  async find(userFilterQuery: FilterQuery<Car>): Promise<Car[]> {
    return this.carModel.find(userFilterQuery);
  }

  async create(car: Car): Promise<Car> {
    const newCar = new this.carModel(car);
    return newCar.save();
  }

  async cleanDatabase() {
    return this.carModel.deleteMany();
  }
}
