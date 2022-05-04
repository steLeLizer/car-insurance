import { UsersRepository } from '../../repositories';
import { UsersService } from '../../services';
import { AppModule } from '../../../app.module';
import { Test } from '@nestjs/testing';
import { User } from '../../schemas';

const newUserMockData = {
  email: 'test@gmail.com',
  password: 'Test123$',
};

const hashedRefreshTokenMockData = 'hashedRefreshToken123$';

describe('UserService Int', () => {
  let usersRepository: UsersRepository;
  let usersService: UsersService;
  let userForUpdate: User;
  let updatedUser: User;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    usersRepository = moduleRef.get(UsersRepository);
    usersService = moduleRef.get(UsersService);
    await usersRepository.cleanDatabase();
  });

  describe('createUser()', () => {
    it('should create user', async () => {
      const newUser = await usersService.createUser(newUserMockData);
      userForUpdate = newUser;

      expect(newUser.email).toBe('test@gmail.com');
    });

    it('should throw on duplicate email', async () => {
      try {
        await usersService.createUser(newUserMockData);
      } catch (error) {
        expect(error.status).toBe(409);
      }
    });
  });

  describe('updateUser()', () => {
    it('should update user', async () => {
      await usersService.updateUser(userForUpdate.userId, {
        hashedRefreshToken: hashedRefreshTokenMockData,
      });
      updatedUser = await usersService.getUserById(userForUpdate.userId);

      expect(updatedUser.hashedRefreshToken).toBe(hashedRefreshTokenMockData);
    });
  });

  describe('getUsers()', () => {
    it('should get users', async () => {
      const users = await usersService.getUsers();

      expect(users.toString()).toContain('test@gmail.com');
    });
  });

  describe('getUserById()', () => {
    it('should get user by id', async () => {
      const user = await usersService.getUserById(userForUpdate.userId);

      expect(user.userId).toBe(userForUpdate.userId);
    });
  });

  describe('getUserByEmail()', () => {
    it('should get user by email', async () => {
      const user = await usersService.getUserByEmail(userForUpdate.email);

      expect(user.email).toBe(userForUpdate.email);
    });
  });
});
