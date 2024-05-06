import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from 'models/user.model';
import { UpdateUserType } from '../utils/types';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}


    async getAll(page: number, size: number): Promise<User[]> {
        const users = await this.userRepository.getAllUsers(page, size);
        return users;
    };

    async getById(id: string): Promise<User> {
        const user = await this.userRepository.getUserById(id);

        if (!user) {
            throw new NotFoundException('User not found');
        };

        return user;
    };

    async update(id: string, updateUserType: UpdateUserType): Promise<User> {
        const user = await this.userRepository.updateUser(id, updateUserType);

        if (!user) {
            throw new NotFoundException('User not found');
        };

        return user;
    };

    async delete(id: string): Promise<boolean> {
        const user = await this.userRepository.getUserById(id);

        if (!user) {
            throw new NotFoundException('User not found');
        };
        
        const result = await this.userRepository.deleteUser(id);

        return result;
    };
};
