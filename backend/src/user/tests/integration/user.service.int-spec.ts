import { UserService } from '../../services';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../../user.module';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../schemas';
import { CreateUserInterface } from '../../interfaces';

const newUserMockData: CreateUserInterface = {
  email: 'test@gmail.com',
  password: 'Test123$',
};

const hashedRefreshTokenMockData = 'hashedRefreshToken123$';

describe('UserService Int', () => {
  let userService: UserService;
  let userForUpdate: User;
  let updatedUser: User;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.TEST_DB_URI),
        UserModule,
      ],
    }).compile();

    userService = moduleRef.get(UserService);
    await userService.cleanDatabase();
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  describe('createUser()', () => {
    it('should create user', async () => {
      const newUser = await userService.createUser(newUserMockData);
      userForUpdate = newUser;

      expect(newUser.email).toBe(newUserMockData.email);
    });

    it('should throw on duplicate email', async () => {
      try {
        await userService.createUser(newUserMockData);
      } catch (error) {
        expect(error.status).toBe(409);
      }
    });
  });

  describe('updateUser()', () => {
    it('should update user', async () => {
      await userService.updateUser(userForUpdate.userId, {
        hashedRefreshToken: hashedRefreshTokenMockData,
      });
      updatedUser = await userService.getUserById(userForUpdate.userId);

      expect(updatedUser.hashedRefreshToken).toBe(hashedRefreshTokenMockData);
    });
  });

  describe('getUsers()', () => {
    it('should get users', async () => {
      const users = await userService.getUsers();

      expect(users.toString()).toContain(newUserMockData.email);
    });
  });

  describe('getUserById()', () => {
    it('should get user by id', async () => {
      const user = await userService.getUserById(userForUpdate.userId);

      expect(user.userId).toBe(userForUpdate.userId);
    });
  });

  describe('getUserByEmail()', () => {
    it('should get user by email', async () => {
      const user = await userService.getUserByEmail(userForUpdate.email);

      expect(user.email).toBe(userForUpdate.email);
    });
  });
});
