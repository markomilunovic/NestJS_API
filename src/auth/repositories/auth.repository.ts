import { Injectable } from '@nestjs/common';
import { User } from '/models/user.model';
import { AccessToken } from 'models/accessToken.model';
import { RefreshToken } from 'models/refreshToken.model';
import { ResetToken } from 'models/resetToken.model';
import { RegisterType } from '../utils/types';

@Injectable()
export class AuthRepository {

    async register(registerType: RegisterType): Promise<User> {
        return User.create({...registerType});
    };

    async findUserByEmail(email: string): Promise<User | null> {

        return User.findOne({ where: { email } }); 
    };

    async createAccessToken(userId: number, accessTokenExpiresAt: Date): Promise<AccessToken> {

         const token = await AccessToken.create({ userId: userId, expiresAt: accessTokenExpiresAt });

         return token;
         
    };

    async createRefreshToken(accessTokenId: number, refreshTokenExpiresAt: Date): Promise<RefreshToken> {

        const token = await RefreshToken.create({ accessTokenId: accessTokenId, expiresAt: refreshTokenExpiresAt });

        return token;
        
   };

   async createResetToken(userId: number, resetTokenExpiresAt: Date): Promise<ResetToken> {

         const token = await ResetToken.create({ userId: userId, expiresAt: resetTokenExpiresAt });

        return token;

   };

    async updateUserPassword(userId: number, newPassword: string): Promise<void> {
        await User.update( {password: newPassword}, { where: { id: userId }});

    };

    async setExpiredResetToken(userId: number): Promise<void> {
        await ResetToken.update({ expiresAt: new Date() }, { where: { id: userId } });
    };
    
    
};
   

