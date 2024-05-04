import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import * as bcrypt from 'bcryptjs';
import { User } from 'models/user.model';
import { EmailService } from './email.service';
import { TokenService } from './token.service';
import { ForgotPasswordType, LoginType, RegisterType, ResetPasswordType } from '../utils/types';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {

    constructor(
        private authRepository: AuthRepository,
        private emailService: EmailService,
        private tokenService: TokenService,
        private configService: ConfigService
    ) {}

    
        async registerUser(registerType: RegisterType): Promise<void> {
            const { email, password } = registerType;
    
            if (await this.authRepository.findUserByEmail(email)) {
                throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
            };
    
            const hashedPassword = await bcrypt.hash(password, 10);
            await this.authRepository.register({...registerType, password: hashedPassword});
        };


        async loginUser(loginType: LoginType): Promise<{ accessToken: string; refreshToken: string; user: User }> {

            const { email, password } = loginType;
            const user = await this.authRepository.findUserByEmail(email);

            if (!user) {
                throw new NotFoundException('User does not exist');
            };
        
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
              throw new UnauthorizedException('Worng password');
            };

            const accessTokenExpiresAt = new Date();
            accessTokenExpiresAt.setDate(accessTokenExpiresAt.getDate() + this.configService.get<number>('ACCESS_TOKEN_EXP_TIME_IN_DAYS'));
  
            const refreshTokenExpiresAt = new Date();
            refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + this.configService.get<number>('REFRESH_TOKEN_EXP_TIME_IN_DAYS'));

            const accessToken = await this.authRepository.createAccessToken(user.id, accessTokenExpiresAt);
            const refreshToken = await this.authRepository.createRefreshToken(accessToken.id, refreshTokenExpiresAt);

            const refreshTokenEncode = {
                jti: refreshToken.id,
                sub: accessToken.id
              };

              const accessTokenToken = this.tokenService.createAccessToken(user);
              const refreshTokenToken = this.tokenService.createRefreshToken(refreshTokenEncode);
        
            return { accessToken: accessTokenToken, refreshToken: refreshTokenToken, user };
          };


          async forgotPassword(forgotPasswordType: ForgotPasswordType): Promise<void> {

            const { email } = forgotPasswordType;
            const user = await this.authRepository.findUserByEmail(email);

            if (!user) {
                throw new NotFoundException('User does not exist');
            };

            const resetTokenExpiresAt = new Date();
            resetTokenExpiresAt.setMinutes(resetTokenExpiresAt.getMinutes() + this.configService.get<number>('RESET_TOKEN_EXP_TIME_IN_MINUTES'));

            const resetToken = await this.authRepository.createResetToken(user.id, resetTokenExpiresAt);
        
            const resetTokenEncode = {
                jti: resetToken.id,
                email: email
            };

            const token = this.tokenService.createResetToken(resetTokenEncode);

            // Send the reset password link to the user's email
            await this.emailService.sendResetPasswordEmail(email, token, user.id);

          };

          async resetPassword(resetPasswordType: ResetPasswordType): Promise<void>{

            const { token, newPassword } = resetPasswordType;

            const decodedToken = this.tokenService.verifyToken(token);

            if (typeof decodedToken === 'string') {
                throw new Error('Invalid token');
              };

            const user = await this.authRepository.findUserByEmail(decodedToken.email);

            if (!user) {
                throw new NotFoundException('User does not exist');
            };

            // Check if the new password is different from the current password
            const passwordMatch = await bcrypt.compare(newPassword, user.password);
            if (passwordMatch) {
                throw new BadRequestException('The new password cannot be same as the old one');
            };

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await this.authRepository.updateUserPassword(user.id, hashedPassword);

            // Set the reset token as expired in the database
            await this.authRepository.setExpiredResetToken(user.id);

          };
        

};

