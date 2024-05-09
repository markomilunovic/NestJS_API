import { IsEmail, IsIn, IsOptional } from "class-validator";

export class UpdateUserDto{
    @IsOptional()
    @IsIn(['user', 'admin'])
    roles?: 'user' | 'admin';

    @IsOptional()
    username?: string;

    @IsOptional()
    password?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    firstName?: string;

    @IsOptional()
    lastname?: string;
};