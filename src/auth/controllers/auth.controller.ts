import { Body, Controller, HttpException, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { User } from 'models/user.model';
import { ForgotPasswordDto } from '../dtos/forgotPassword.dto';
import { ResetPasswordDto } from '../dtos/resetPassword.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('register')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async register(@Body() registerDto: RegisterDto): Promise<object> {

        try{
            await this.authService.registerUser(registerDto);
            return { message: 'User registered successfully' };
            
        } catch (error) {
            throw new HttpException('Error registering user', HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @Post('login')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string; refreshToken: string; user: User }> {

        try {
            const { accessToken, refreshToken, user } = await this.authService.loginUser(loginDto);
            return { accessToken, refreshToken, user };

        } catch (error) {
            throw new HttpException('Error logging in', HttpStatus.INTERNAL_SERVER_ERROR);
        };

    };

    @Post('forgot-password')
    @UsePipes(new ValidationPipe( {whitelist: true, forbidNonWhitelisted: true}))
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<object> {

        try{

            await this.authService.forgotPassword(forgotPasswordDto);
            return { message: 'Reset password link sent to your email' }

        } catch(error) {
            throw new HttpException('Failed to process forgot password request', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    @Post('reset-password')
    @UsePipes(new ValidationPipe( {whitelist: true, forbidNonWhitelisted: true}))
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<object> {

        try{
            await this.authService.resetPassword(resetPasswordDto);
            return { message: 'Password reset successful' };
        } catch(error) {
            console.log(error)
            throw new HttpException('Failed to reset password', HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };


};


