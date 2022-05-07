import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UserSeeder } from '../../user/seeders';
import { RuleSeeder } from '../../rule/seeders';
import { CarSeeder } from '../../car/seeders';

@Injectable()
export class AllSeeder {
  constructor(
    private readonly userSeeder: UserSeeder,
    private readonly ruleSeeder: RuleSeeder,
    private readonly carSeeder: CarSeeder,
  ) {}

  @Command({
    command: 'seed:all',
    describe: 'seed all',
  })
  async create() {
    await this.userSeeder.create();
    await this.ruleSeeder.create();
    await this.carSeeder.create();
  }
}
