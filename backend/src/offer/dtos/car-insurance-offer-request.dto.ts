import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RuleTypeEnum } from '../../rule/enums';
import { ApiProperty } from '@nestjs/swagger';

export class CarInsuranceOfferRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
  })
  ruleType: RuleTypeEnum;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
  })
  driverAge?: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
  })
  carName?: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
  })
  purchasePrice?: number;
}
