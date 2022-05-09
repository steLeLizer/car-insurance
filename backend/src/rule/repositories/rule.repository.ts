import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { Rule, RuleDocument } from '../schemas';

@Injectable()
export class RuleRepository {
  constructor(@InjectModel(Rule.name) private ruleModel: Model<RuleDocument>) {}

  async findOne(ruleFilterQuery: FilterQuery<Rule>): Promise<Rule> {
    return this.ruleModel.findOne(ruleFilterQuery);
  }

  async find(rulesFilterQuery: FilterQuery<Rule>): Promise<Rule[]> {
    return this.ruleModel.find(rulesFilterQuery);
  }

  async create(rule: Rule): Promise<Rule> {
    const newRule = new this.ruleModel(rule);
    return newRule.save();
  }

  async findOneAndUpdate(
    ruleFilterQuery: FilterQuery<Rule>,
    rule: Partial<Rule>,
  ): Promise<Rule> {
    return this.ruleModel.findOneAndUpdate(ruleFilterQuery, rule);
  }

  async cleanCollection() {
    return this.ruleModel.deleteMany();
  }
}
