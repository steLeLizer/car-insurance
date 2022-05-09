import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { RuleRepository } from '../repositories';
import { Rule } from '../schemas';
import { CreateRuleInterface } from '../interfaces';

@Injectable()
export class RuleService {
  constructor(private readonly ruleRepository: RuleRepository) {}

  async getRuleById(ruleId: string): Promise<Rule> {
    const rule = await this.ruleRepository.findOne({ ruleId });

    if (!rule) throw new NotFoundException('Rule not found');

    return rule;
  }

  async getRuleByType(type: string): Promise<Rule> {
    return this.ruleRepository.findOne({ type });
  }

  async getRules(): Promise<Rule[]> {
    return this.ruleRepository.find({});
  }

  async createRule(body: CreateRuleInterface): Promise<Rule> {
    const { type, priceMin, driverAgeMin, highRiskDriverAgeMin } = body;

    if (await this.getRuleByType(type))
      throw new ConflictException('Rule already exists');

    return this.ruleRepository.create({
      ruleId: uuidv4(),
      type,
      priceMin,
      driverAgeMin,
      highRiskDriverAgeMin,
    });
  }

  async deleteAllRules() {
    return this.ruleRepository.cleanCollection();
  }
}
