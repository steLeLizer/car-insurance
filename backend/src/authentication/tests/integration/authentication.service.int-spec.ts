import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from '../../services';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../../../user/user.module';
import { AuthenticationModule } from '../../authentication.module';
import { UserService } from '../../../user/services';
import { TokensType } from '../../types';
import { User } from '../../../user/schemas';
import { AuthenticationDto } from '../../dtos';

const userMockData: AuthenticationDto = {
  email: 'auth.test@gmail.com',
  password: 'superSecretPassword123$',
};

describe('Authentication Flow', () => {
  let userService: UserService;
  let authService: AuthenticationService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.TEST_DB_URI),
        UserModule,
        AuthenticationModule,
      ],
    }).compile();

    userService = moduleRef.get(UserService);
    authService = moduleRef.get(AuthenticationService);
    await userService.cleanDatabase();
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  describe('register', () => {
    it('should register', async () => {
      const tokens = await authService.register({
        email: userMockData.email,
        password: userMockData.password,
      });

      expect(tokens.accessToken).toBeTruthy();
      expect(tokens.refreshToken).toBeTruthy();
    });

    it('should throw on duplicate user registration', async () => {
      let tokens: TokensType | undefined;
      try {
        tokens = await authService.register({
          email: userMockData.email,
          password: userMockData.password,
        });
      } catch (error) {
        expect(error.status).toBe(409);
      }

      expect(tokens).toBeUndefined();
    });
  });

  describe('login', () => {
    it('should throw if no existing user', async () => {
      let tokens: TokensType | undefined;
      try {
        tokens = await authService.login({
          email: userMockData.email + 'a',
          password: userMockData.password,
        });
      } catch (error) {
        expect(error.status).toBe(401);
      }
      expect(tokens).toBeUndefined();
    });

    it('should login', async () => {
      const tokens = await authService.login({
        email: userMockData.email,
        password: userMockData.password,
      });
      expect(tokens.accessToken).toBeTruthy();
      expect(tokens.refreshToken).toBeTruthy();
    });

    it('should throw if password incorrect', async () => {
      let tokens: TokensType | undefined;
      try {
        tokens = await authService.login({
          email: userMockData.email,
          password: userMockData.password + 'a',
        });
      } catch (error) {
        expect(error.status).toBe(401);
      }
      expect(tokens).toBeUndefined();
    });
  });

  describe('logout', () => {
    it('should pass if call to non existent user', async () => {
      const result = await authService.logout('');

      expect(result).toBeUndefined();
    });

    it('should logout', async () => {
      await authService.login({
        email: userMockData.email,
        password: userMockData.password,
      });

      let userFromDb: User | null;

      userFromDb = await userService.getUserByEmail(userMockData.email);

      expect(userFromDb?.hashedRefreshToken).toBeTruthy();

      // logout
      await authService.logout(userFromDb?.userId);

      userFromDb = await userService.getUserByEmail(userMockData.email);

      expect(userFromDb?.hashedRefreshToken).toBeFalsy();
    });
  });

  describe('refresh', () => {
    it('should throw if no existing user', async () => {
      let tokens: TokensType | undefined;
      try {
        tokens = await authService.refreshTokens('', '');
      } catch (error) {
        expect(error.status).toBe(404);
      }
      expect(tokens).toBeUndefined();
    });

    it('should throw if user logged out', async () => {
      // register and save refresh token
      const _tokens = await authService.login({
        email: userMockData.email,
        password: userMockData.password,
      });

      const refreshToken = _tokens.refreshToken;

      const { userId } = await userService.getUserByEmail(userMockData.email);

      // log out the user so the hashedRefreshToken is set to null
      await authService.logout(userId);

      let tokens: TokensType | undefined;
      try {
        tokens = await authService.refreshTokens(userId, refreshToken);
      } catch (error) {
        expect(error.status).toBe(403);
      }

      expect(tokens).toBeUndefined();
    });

    it('should throw if refresh token incorrect', async () => {
      const _tokens = await authService.login({
        email: userMockData.email,
        password: userMockData.password,
      });

      const refreshToken = _tokens.refreshToken;

      const { userId } = await userService.getUserByEmail(userMockData.email);

      // log out the user to set the hashedRefreshToken to null
      await authService.logout(userId);

      let tokens: TokensType | undefined;
      try {
        tokens = await authService.refreshTokens(userId, refreshToken + 'a');
      } catch (error) {
        expect(error.status).toBe(403);
      }
      expect(tokens).toBeUndefined();
    });

    it('should refresh tokens', async () => {
      // log in the user again and save refreshToken + accessToken
      const _tokens = await authService.login({
        email: userMockData.email,
        password: userMockData.password,
      });

      const refreshToken = _tokens.refreshToken;
      const accessToken = _tokens.accessToken;

      const { userId } = await userService.getUserByEmail(userMockData.email);

      // since jwt uses seconds signature we need to wait for 1 second to have new jwts
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });

      const tokens = await authService.refreshTokens(userId, refreshToken);
      expect(tokens).toBeDefined();

      // refreshed tokens should be different
      expect(tokens.accessToken).not.toBe(accessToken);
      expect(tokens.refreshToken).not.toBe(refreshToken);
    });
  });
});
