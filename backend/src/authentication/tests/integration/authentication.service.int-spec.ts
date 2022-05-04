import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from '../../services';
import { AppModule } from '../../../app.module';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = moduleRef.get<AuthenticationService>(AuthenticationService);
  });

  it('auth should be defined', () => {
    expect(service).toBeDefined();
  });
});
