import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../../user/repositories/user.repository';
import { User } from 'models/user.model';
import { UpdateUserType } from 'user/utils/types';

jest.mock('../repositories/user.repository');


describe('UserService', () => {
  let service: UserService;
  let userRepository: jest.Mocked<UserRepository>;

 beforeEach(async () => {
  jest.clearAllMocks(); // Clears usage data between tests to avoid leaks
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UserService,
      {
        provide: UserRepository,
        useValue: {
          getAllUsers: jest.fn(),
          getUserById: jest.fn(),
          updateUser: jest.fn(),
          deleteUser: jest.fn()
        }
      }
    ],
  }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('getAll', () => {
    it('should return all users', async () => {
      const mockUsers: Partial<User>[] = [
        { id: 1, username: 'User 1', email: 'test1@example.com', password: 'testPassword1', firstName: 'Test1', lastName: 'User1' },
        { id: 2, username: 'User 2', email: 'test2@example.com', password: 'testPassword2', firstName: 'Test2', lastName: 'User2' }
      ];

      const page = 1;
      const size = 10;
      userRepository.getAllUsers.mockResolvedValue(mockUsers as User[]);

      const result = await service.getAll(page, size);

      expect(result).toEqual(mockUsers);
    });
  });

  describe('getById', () => {
    it('should return a user by its ID', async () => {
      const userId = '1';
      const expectedUser: Partial<User> = { 
        id: 1, 
        username: 'testUser',
        email: 'test@example.com',
        password: 'testPassword',
        firstName: 'Test',
        lastName: 'User'
      };

      userRepository.getUserById.mockResolvedValue(expectedUser as User);

      const result = await service.getById(userId);

      expect(result).toEqual(expectedUser);
    });

    it('should throw NotFoundException when no user is found', async () => {
      const nonExistentUserId = '999';
      userRepository.getUserById.mockResolvedValue(null);

      await expect(service.getById(nonExistentUserId)).rejects.toThrow('User not found');
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userId = '123'; 
      const updatedUser = {
        username: 'testUser',
        email: 'test@example.com',
        password: 'testPassword',
        firstName: 'Test',
        lastName: 'User'
      };
      userRepository.updateUser.mockResolvedValue(updatedUser as User);

      const result = await service.update(userId, updatedUser as UpdateUserType);

      expect(result).toEqual(updatedUser);
    });

    it('should throw NotFoundException when no user is found', async () => {
      const nonExistentUserId = '999';
      const updatedUser = {
        username: 'testUser',
        email: 'test@example.com',
        password: 'testPassword',
        firstName: 'Test',
        lastName: 'User'
      };
      userRepository.getUserById.mockResolvedValue(null);

      await expect(service.update(nonExistentUserId, updatedUser as UpdateUserType)).rejects.toThrow('User not found');
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const userId = '123';
     
      userRepository.getUserById.mockResolvedValue({
        username: 'testUser',
        email: 'test@example.com',
        password: 'testPassword',
        firstName: 'Test',
        lastName: 'User'
    } as User);

      userRepository.deleteUser.mockResolvedValue(true);

      const result = await service.delete(userId);
      expect(result).toBe(true);

    });
    it('should throw NotFoundException when no user is found', async () => {
      const nonExistentUserId = '999';
      userRepository.getUserById.mockResolvedValue(null);

      await expect(service.delete(nonExistentUserId)).rejects.toThrow('User not found');
    });
  });
});
