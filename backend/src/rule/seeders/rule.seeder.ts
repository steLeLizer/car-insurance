import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RuleService } from '../services';
import { RuleTypeEnum } from '../enums';

@Injectable()
export class RuleSeeder {
  constructor(private readonly ruleService: RuleService) {}

  @Command({
    command: 'db:seed:rules',
    describe: 'seed rules',
  })
  async create() {
    await this.ruleService.cleanDatabase();
    await this.ruleService.createRule({
      type: RuleTypeEnum.Car,
      priceMin: 5000,
      driverAgeMin: 18,
      highRiskDriverAgeMin: 25,
    });
  }
}
