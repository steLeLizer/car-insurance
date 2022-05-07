import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Rule, RuleSchema } from './schemas';
import { RuleService } from './services';
import { RuleRepository } from './repositories';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rule.name, schema: RuleSchema }]),
  ],
  providers: [RuleService, RuleRepository],
  exports: [RuleService],
})
export class RuleModule {}
