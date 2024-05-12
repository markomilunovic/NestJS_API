import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { RedisService } from '../caching/services/redis.service';
import { ConfigService } from '@nestjs/config';

@Module({
    controllers: [UserController],
    providers: [UserService, UserRepository, RedisService, ConfigService]
})
export class UserModule {}
