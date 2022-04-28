import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserInterface } from './interfaces';

import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(userId: string): Promise<User> {
    if (!(await this.usersRepository.findOne({ userId }))) {
      throw new HttpException(
        { message: 'User not found.' },
        HttpStatus.NOT_FOUND,
      );
    }
    return this.usersRepository.findOne({ userId });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async createUser(email: string, password: string): Promise<User> {
    if (await this.usersRepository.findOne({ email })) {
      throw new HttpException(
        { message: 'User already exists.' },
        HttpStatus.CONFLICT,
      );
    }
    return this.usersRepository.create({
      userId: uuidv4(),
      email,
      password,
    });
  }

  async updateUser(
    userId: string,
    userUpdates: UpdateUserInterface,
  ): Promise<User> {
    if (!(await this.usersRepository.findOne({ userId }))) {
      throw new HttpException(
        { message: 'User not found.' },
        HttpStatus.NOT_FOUND,
      );
    }
    return this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
  }

  async deleteUser(userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({ userId });
    if (!user) {
      throw new HttpException(
        { message: 'User not found.' },
        HttpStatus.NOT_FOUND,
      );
    }
    return this.usersRepository.remove(user);
  }
}
