import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterDto {
    @IsNotEmpty({ message: 'Username is required' })
    username: string;

    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'First name is required' })
    firstName: string;

    @IsNotEmpty({ message: 'Last name is required' })
    lastName: string;
};