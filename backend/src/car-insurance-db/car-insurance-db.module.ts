import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema, User, UserSchema } from './schemas';
import { UserController, CarController } from './controllers';
import { UserService, CarService } from './services';
import { CarRepository, UserRepository } from './repositories';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Car.name, schema: CarSchema },
    ]),
  ],
  controllers: [UserController, CarController],
  providers: [UserService, UserRepository, CarService, CarRepository],
  exports: [UserService],
})
export class CarInsuranceDbModule {}
