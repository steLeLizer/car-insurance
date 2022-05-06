import { RuleTypeEnum } from '../enums';

export interface CreateRuleInterface {
  type: RuleTypeEnum;
  priceMin?: number;
  driverAgeMin?: number;
  highRiskDriverAgeMin?: number;
}
