import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';  // Предполагаем, что у вас есть модуль для пользователей
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    // Подключаем модуль пользователей, чтобы сервис аутентификации мог их находить
    UserModule, 
    PassportModule,
    JwtModule.register({
      // Секретный ключ. В реальном приложении ОБЯЗАТЕЛЬНО выносите в переменные окружения (.env)
      secret: 'YOUR_SECRET_KEY', 
      signOptions: { 
        // Время жизни токена (например, 60 минут)
        expiresIn: '60m' 
      },
    }),
  ],
  providers: [AuthService, JwtStrategy], // JwtStrategy мы создадим на Шаге 5
  controllers: [AuthController],
  exports: [AuthService], // Экспортируем, если нужно будет использовать в других модулях
})
export class AuthModule {}