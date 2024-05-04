import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "models/user.model";
import { UpdateUserDto } from "../dtos/updateUser.dto";

@Injectable()
export class UserRepository{


    async getAllUsers(page: number, size: number): Promise<User[]> {
        const users = await User.findAll({
            offset: page * size,
            limit: size
        });
        return users;
    };

    async getUserById(id: string): Promise<User> {
        const user = await User.findByPk(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    };

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await User.findByPk(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const updatedUser = await user.update({ ...updateUserDto});
        return updatedUser;
    };

    async deleteUser(id: string): Promise<boolean> {
        const result = await User.destroy({
            where: { id }
        });
        if (result === 0) {
            return false;
        };
        return true;
    };

};