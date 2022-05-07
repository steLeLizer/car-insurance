import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RuleTypeEnum } from '../enums';

export type RuleDocument = Rule & Document;

@Schema()
export class Rule {
  @Prop({ required: true, unique: true })
  ruleId: string;

  @Prop({ required: true, unique: true })
  type: RuleTypeEnum;

  @Prop()
  priceMin: number;

  @Prop()
  driverAgeMin: number;

  @Prop()
  highRiskDriverAgeMin: number;
}

export const RuleSchema = SchemaFactory.createForClass(Rule);
