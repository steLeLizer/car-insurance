import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserInterface, UpdateUserInterface } from '../interfaces';

import { User } from '../schemas';
import { UsersRepository } from '../repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(userId: string): Promise<User> {
    if (!(await this.usersRepository.findOne({ userId })))
      throw new NotFoundException('User not found.');

    return this.usersRepository.findOne({ userId });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async createUser(body: CreateUserInterface): Promise<User> {
    const { email, password } = body;

    if (await this.usersRepository.findOne({ email }))
      throw new ConflictException('User already exists.');

    return this.usersRepository.create({
      userId: uuidv4(),
      email,
      password,
      hashedRefreshToken: null,
    });
  }

  async updateUser(
    userId: string,
    userUpdates: UpdateUserInterface,
  ): Promise<User> {
    if (!(await this.usersRepository.findOne({ userId })))
      throw new NotFoundException('User not found.');

    return this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
  }
}
