import { IsEmail, IsOptional } from "class-validator";

export class UpdateUserDto{
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