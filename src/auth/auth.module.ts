import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from 'src/user/user.module' // Предполагаем, что у вас есть модуль для пользователей
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJwtConfig } from 'src/config/jwt.config'
import { JwtStrategy } from './jwt.strategy'

@Module({
	imports: [
		UserModule,
		ConfigModule,
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],

			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController],
	exports: [AuthService]
})
export class AuthModule {}
