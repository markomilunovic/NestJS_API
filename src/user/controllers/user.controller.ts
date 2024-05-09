import { Body, Controller, Delete, Get, Param, Put, Query, HttpStatus, HttpException, NotFoundException, UseGuards } from '@nestjs/common';
import { UpdateUserDto } from '../dtos/updateUser.dto';
import { UserService } from '../services/user.service';
import { User } from 'models/user.model';
import { Roles } from 'auth/decorators/roles.decorator';
import { RolesGuard } from 'auth/guards/roles.guard';

@UseGuards( RolesGuard)
@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}
    
    @Get()
    @Roles('admin')
    async getAllUsers(@Query('page') page: string, @Query('size') size: string): Promise<User[]> {
        try {
            const pageAsNumber = parseInt(page, 10) || 0;
            const sizeAsNumber = parseInt(size, 10) || 10;
            const users = await this.userService.getAll(pageAsNumber, sizeAsNumber);
            return users;
        } catch (error) {
            throw new HttpException('Error retrieving users', HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User> {
        try {
            const user = await this.userService.getById(id);
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            };
            return user;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            };
            throw new HttpException('Error retrieving user by id', HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<object> {
        try {
            await this.userService.update(id, updateUserDto);
        
            return { message: 'User updated successfully' };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            };
            throw new HttpException('Error updating user', HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<object> {
        try {
            await this.userService.delete(id);

            return { message: 'User deleted successfully' };
        }
        catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            };
            throw new HttpException('Error deleting user', HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };
};
