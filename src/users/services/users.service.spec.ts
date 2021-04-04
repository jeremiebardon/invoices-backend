import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { mockUserModel } from '../mocks/users.mocks';
import { UsersService } from './users.service';
import { UserController } from './../users.controller';
import { AuthService } from 'src/auth/services/auth.service';
import { MailerService } from '@nestjs-modules/mailer';
import mockedMailerService from 'src/utils/mocks/mailer.mocks';
import { ConfigService } from '@nestjs/config';
import mockedConfigService from 'src/utils/mocks/config.mocks';
import mockedJwtService from 'src/utils/mocks/jwt.mocks';
import { JwtService } from '@nestjs/jwt';

describe('UsersService', () => {
  let usersController: UserController;
  let usersService: UsersService;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UsersService,
        AuthService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
        {
          provide: MailerService,
          useValue: mockedMailerService,
        },
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
    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(usersController).toBeDefined();
  });
});
