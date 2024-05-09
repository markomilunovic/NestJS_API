import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'models/user.model';
import { AuthRepository } from '../repositories/auth.repository';
import { JwtPayloadType } from 'auth/utils/types';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private authRepository: AuthRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
    });
  };

  async validate(payload: JwtPayloadType): Promise<User> {

    const user = await this.authRepository.findUserByEmail(payload.user.email);

    if (!user) {
      throw new NotFoundException('User not found');
    };

    return user;

  };
};
