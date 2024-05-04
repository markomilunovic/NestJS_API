import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail()
    email: string;

};