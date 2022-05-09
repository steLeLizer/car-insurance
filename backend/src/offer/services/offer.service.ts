import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RuleService } from '../../rule/services';
import { CarInsuranceOfferRequestDto } from '../dtos';
import { CarService } from '../../car/services';
import { CarInsuranceOfferResponseInterface } from '../interfaces';

@Injectable()
export class OfferService {
  constructor(
    private readonly ruleService: RuleService,
    private readonly carService: CarService,
  ) {}

  async carInsuranceOffer(
    body: CarInsuranceOfferRequestDto,
  ): Promise<CarInsuranceOfferResponseInterface> {
    const { ruleType, driverAge, carName, purchasePrice } = body;

    const rule = await this.ruleService.getRuleByType(ruleType);
    const car = await this.carService.getCarByName(carName);

    if (!rule) throw new NotFoundException('Rule not found');
    if (!car) throw new NotFoundException('Car not found');

    // business rules
    // backend validation
    if (purchasePrice < rule.priceMin)
      throw new ConflictException('Sorry, the price of the car is too low');

    if (driverAge < rule.driverAgeMin)
      throw new ConflictException('Sorry, the driver is too young');

    if (car.highRisk && driverAge < rule.highRiskDriverAgeMin)
      throw new ConflictException(
        'Sorry, we cannot accept this particular risk',
      );

    return this.computeCarInsuranceOffer(car.price, car.universalPercentage);
  }

  computeCarInsuranceOffer(
    carPrice: number,
    carUniversalPercentage: number,
  ): CarInsuranceOfferResponseInterface {
    let yearlyGlobalOffer = 0;
    let yearlyUniversalOffer = 0;
    let monthlyGlobalOffer = 0;
    let monthlyUniversalOffer = 0;

    yearlyGlobalOffer = carPrice;
    yearlyUniversalOffer = carPrice * carUniversalPercentage + carPrice;

    monthlyGlobalOffer = yearlyGlobalOffer / 12;
    monthlyUniversalOffer = yearlyUniversalOffer / 12;

    return {
      yearly: {
        globalOffer: Number(yearlyGlobalOffer.toFixed(2)).toLocaleString(
          'de-DE',
          { maximumFractionDigits: 3, minimumFractionDigits: 2 },
        ),
        universalOffer: Number(yearlyUniversalOffer.toFixed(2)).toLocaleString(
          'de-DE',
          { maximumFractionDigits: 3, minimumFractionDigits: 2 },
        ),
      },
      monthly: {
        globalOffer: Number(monthlyGlobalOffer.toFixed(2)).toLocaleString(
          'de-DE',
          { maximumFractionDigits: 3, minimumFractionDigits: 2 },
        ),
        universalOffer: Number(monthlyUniversalOffer.toFixed(2)).toLocaleString(
          'de-DE',
          { maximumFractionDigits: 3, minimumFractionDigits: 2 },
        ),
      },
    };
  }
}
