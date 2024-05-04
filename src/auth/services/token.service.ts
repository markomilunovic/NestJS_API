import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { User } from 'models/user.model';
import { RefreshTokneEncodeType, ResetTokneEncodeType } from '../utils/types';


@Injectable()
export class TokenService {
    constructor(private configService: ConfigService) {}

    createAccessToken(user: User): string {
        const expiresIn = `${this.configService.get('ACCESS_TOKEN_EXP_TIME_IN_DAYS')}d`;
        return jwt.sign({ user }, this.configService.get('ACCESS_TOKEN_SECRET'), { expiresIn });
    };

    createRefreshToken(refreshTokenEncode: RefreshTokneEncodeType): string {
        const expiresIn = `${this.configService.get('REFRESH_TOKEN_EXP_TIME_IN_DAYS')}d`;
        return jwt.sign({ refreshTokenEncode }, this.configService.get('REFRESH_TOKEN_SECRET'), { expiresIn });
    };

    createResetToken(resetTokenEncode: ResetTokneEncodeType): string {
        const expiresIn = `${this.configService.get('RESET_TOKEN_EXP_TIME_IN_MINUTES')}d`;
        return jwt.sign({ resetTokenEncode }, this.configService.get('RESET_TOKEN_SECRET'), { expiresIn });
    };

    verifyToken(token: string): any  {
        return jwt.verify(token, this.configService.get('RESET_TOKEN_SECRET'));
    };
};