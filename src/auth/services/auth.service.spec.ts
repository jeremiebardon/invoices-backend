import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

import * as bcrypt from 'bcrypt';

// Mocks
import mockedConfigService from 'src/utils/mocks/config.mocks';
import mockedJwtService from 'src/utils/mocks/jwt.mocks';

fdescribe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  describe('AuthService', () => {
    it('should be defined', () => {
      expect(authService).toBeDefined();
    });
  });

  describe('.login', () => {
    it('should sign in user', async () => {
      const jwtSign = jest.spyOn(jwtService, 'sign');
      await authService.login({ email: 'jerembardon@gmail.com' } as any);

      expect(jwtSign).toBeCalled();
    });
  });

  describe('.generateJWT', () => {
    it('should sign in user', async () => {
      const jwtSign = jest.spyOn(jwtService, 'sign');
      await authService.generateJWT({ email: 'jerembardon@gmail.com' } as any);

      expect(jwtSign).toBeCalled();
    });
  });

  describe('.hashPassword', () => {
    let bcryptHash: jest.Mock;

    beforeEach(async () => {
      bcryptHash = jest.fn().mockReturnValue('UioKJnbKIM$ldjle/Ljshmwi');
      (bcrypt.hash as jest.Mock) = bcryptHash;
    });

    it('should hash password', async () => {
      await authService.hashPassword('passwordSecure');

      expect(bcryptHash).toBeCalled();
    });
  });

  describe('.validatePassword', () => {
    let bcryptCompare: jest.Mock;

    beforeEach(async () => {
      bcryptCompare = jest.fn().mockReturnValue(true);
      (bcrypt.compare as jest.Mock) = bcryptCompare;
    });

    it('should hash password', async () => {
      await authService.validatePassword('passwordSecure', '5ejdej-58548-dsdsd');

      expect(bcryptCompare).toBeCalled();
    });
  });
});
