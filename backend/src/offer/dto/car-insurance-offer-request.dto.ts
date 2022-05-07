import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RuleTypeEnum } from '../../rule/enums';
import { ApiProperty } from '@nestjs/swagger';

export class CarInsuranceOfferRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'ruleType',
  })
  ruleType: RuleTypeEnum;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'driverAge',
  })
  driverAge?: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'carName',
  })
  carName?: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'purchasePrice',
  })
  purchasePrice?: number;
}
