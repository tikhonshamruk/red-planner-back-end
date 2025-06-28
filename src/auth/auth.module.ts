import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';  // Предполагаем, что у вас есть модуль для пользователей
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    // Подключаем модуль пользователей, чтобы сервис аутентификации мог их находить
    UserModule, 
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService]
    })
  ],
  providers: [AuthService], // JwtStrategy мы создадим на Шаге 5
  controllers: [AuthController],
  exports: [AuthService], // Экспортируем, если нужно будет использовать в других модулях
})
export class AuthModule {}