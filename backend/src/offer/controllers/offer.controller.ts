import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { OfferService } from '../services';
import { SkipThrottle } from '@nestjs/throttler';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { CarInsuranceOfferRequestDto } from '../dto';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post('car-insurance')
  @SkipThrottle()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Offer returned' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Rule not found' })
  @ApiNotFoundResponse({ description: 'Car not found' })
  @ApiConflictResponse({
    description: 'Sorry, the price of the car is too low',
  })
  @ApiConflictResponse({
    description: 'Sorry, the driver is too young',
  })
  @ApiConflictResponse({
    description: 'Sorry, we cannot accept this particular risk',
  })
  @HttpCode(HttpStatus.OK)
  logout(@Body() body: CarInsuranceOfferRequestDto) {
    return this.offerService.carInsuranceOffer(body);
  }
}
