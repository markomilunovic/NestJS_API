import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './models/user.model';
import { Todo } from './models/todo.model';
import { AccessToken } from './models/accessToken.model';
import { RefreshToken } from './models/refreshToken.model';
import { ResetToken } from './models/resetToken.model';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { CachingModule } from 'caching/caching.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    SequelizeModule.forRootAsync({
      imports: [ConfigModule], 
      inject: [ConfigService], 
      useFactory: (configService: ConfigService): SequelizeModuleOptions => ({
        dialect: configService.get<any>('DB_DIALECT'), 
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT'), 10), 
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        models: [User, Todo, AccessToken, RefreshToken, ResetToken],
        autoLoadModels: true,
        synchronize: true
      }),
    }),
    TodoModule,
    UserModule,
    AuthModule,
    CachingModule
  ],
})
export class AppModule {}

