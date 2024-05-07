import { Injectable } from "@nestjs/common";
import { User } from "../../models/user.model";
import { UpdateUserType } from "user/utils/types";

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
        
        return user;
    };

    async updateUser(id: string, updateUserType: UpdateUserType): Promise<User> {
        const user = await User.findByPk(id);
        
        const updatedUser = await user.update({ ...updateUserType});

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