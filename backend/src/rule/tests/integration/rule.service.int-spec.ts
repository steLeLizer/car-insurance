import { RuleService } from '../../services';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RuleModule } from '../../rule.module';
import { Test, TestingModule } from '@nestjs/testing';
import { Rule } from '../../schemas';
import { RuleTypeEnum } from '../../enums';
import { CreateRuleInterface } from '../../interfaces';

const newRuleMockData: CreateRuleInterface = {
  type: RuleTypeEnum.Car,
  priceMin: 5000,
  driverAgeMin: 18,
  highRiskDriverAgeMin: 25,
};

describe('RuleService Int', () => {
  let ruleService: RuleService;
  let newRule: Rule;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.TEST_DB_URI),
        RuleModule,
      ],
    }).compile();

    ruleService = moduleRef.get(RuleService);
    await ruleService.deleteAllRules();
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  describe('createRule()', () => {
    it('should create car', async () => {
      newRule = await ruleService.createRule(newRuleMockData);

      expect(newRule.type).toBe(newRuleMockData.type);
    });

    it('should throw on duplicate type', async () => {
      try {
        await ruleService.createRule(newRuleMockData);
      } catch (error) {
        expect(error.status).toBe(409);
      }
    });
  });

  describe('getRules()', () => {
    it('should get rules', async () => {
      const rules = await ruleService.getRules();

      expect(rules.toString()).toContain(newRuleMockData.type);
    });
  });

  describe('getRuleById()', () => {
    it('should get rule by id', async () => {
      const rule = await ruleService.getRuleById(newRule.ruleId);

      expect(rule.ruleId).toBe(newRule.ruleId);
    });
  });

  describe('getRuleByType()', () => {
    it('should get rule by type', async () => {
      const rule = await ruleService.getRuleByType(newRule.type);

      expect(rule.type).toBe(newRule.type);
    });
  });
});
