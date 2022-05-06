import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from './schemas';
import { CarController } from './controllers';
import { CarService } from './services';
import { CarRepository } from './repositories';

@Module({
  imports: [MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }])],
  controllers: [CarController],
  providers: [CarService, CarRepository],
  exports: [CarService],
})
export class CarModule {}
