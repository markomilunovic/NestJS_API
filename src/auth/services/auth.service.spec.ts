import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthRepository } from '../repositories/auth.repository';
import { User } from 'models/user.model';
import { BadRequestException } from '@nestjs/common';
import { EmailService } from './email.service';
import { TokenService } from './token.service';
import { ConfigService } from '@nestjs/config';

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
  compare: jest.fn(),
}));

jest.mock('../repositories/auth.repository');
jest.mock('./email.service');
jest.mock('./token.service');
jest.mock('@nestjs/config');

describe('AuthService', () => {
  let service: AuthService;
  let authRepository: jest.Mocked<AuthRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthRepository,
          useValue: {
            findUserByEmail: jest.fn(),
            findUserByUsername: jest.fn(),
            register: jest.fn(),
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendResetPasswordEmail: jest.fn()
          },
        },
        {
          provide: TokenService,
          useValue: {
            createAccessToken: jest.fn(),
            createRefreshToken: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn()
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    authRepository = module.get(AuthRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('registerUser', () => {
    const registerData = {
      username: 'testUser',
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User'
    };

    it('should successfully register a new user', async () => {
      authRepository.findUserByUsername.mockResolvedValue(null);
      authRepository.findUserByEmail.mockResolvedValue(null);
      authRepository.register.mockResolvedValue({ ...registerData, id: 1, password: 'hashedPassword' } as User);

      const result = await service.registerUser(registerData);

      expect(result).toEqual({
        id: 1,
        username: registerData.username,
        email: registerData.email,
        firstName: registerData.firstName,
        lastName: registerData.lastName
      });
    });

    it('should throw a BadRequestException if the user already exists', async () => {
      authRepository.findUserByUsername.mockResolvedValue({
        id: 1,
        username: registerData.username,
        email: registerData.email,
        password: 'hashedPassword',
        firstName: registerData.firstName,
        lastName: registerData.lastName
      } as User);

      // Alternatively, check the email in a separate test or combine logic
      await expect(service.registerUser(registerData)).rejects.toThrow(BadRequestException);

      // If checking email separately, reset the username mock to null
      authRepository.findUserByUsername.mockResolvedValue(null);
      authRepository.findUserByEmail.mockResolvedValue({
        id: 1,
        username: registerData.username,
        email: registerData.email,
        password: 'hashedPassword',
        firstName: registerData.firstName,
        lastName: registerData.lastName
      } as User);

      await expect(service.registerUser(registerData)).rejects.toThrow(BadRequestException);
    });
  });

});


