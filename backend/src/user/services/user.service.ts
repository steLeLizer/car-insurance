import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserInterface, UpdateUserInterface } from '../interfaces';

import { User } from '../schemas';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ userId });

    if (!user) throw new NotFoundException('Car not found');

    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async createUser(body: CreateUserInterface): Promise<User> {
    const { email, password } = body;

    if (await this.userRepository.findOne({ email }))
      throw new ConflictException('User already exists');

    return this.userRepository.create({
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
    if (!(await this.getUserById(userId)))
      throw new NotFoundException('User not found');

    return this.userRepository.findOneAndUpdate({ userId }, userUpdates);
  }

  async deleteAllUsers() {
    return this.userRepository.deleteAll();
  }
}
