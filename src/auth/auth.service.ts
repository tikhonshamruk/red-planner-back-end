import { UserService } from 'src/user/user.service'
import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthDto } from './dto/auth.dto'
import { verify, hash } from 'argon2'
import { Response } from 'express'

@Injectable()
export class AuthService {
	EXPIRE_DAY_REFRESH_TOKEN = 1
	REFRESH_TOKEN_NAME = 'refreshToken'

	constructor(
		private jwt: JwtService,
		private userService: UserService
	) {}
	async login(dto: AuthDto) {
		//eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = await this.validateUser(dto)
		const tokens = this.issueTokens(user.id) // генерируем токен

		return {
			user,
			...tokens
		}
	}

	async register(dto: AuthDto) {
		const oldUser = await this.userService.getByEmail(dto.email)

		console.log('Пароль, введеный пользователем (без хеширования):', dto.password)

		if (oldUser) throw new BadRequestException('User already exits')

		const hashedPassword = await hash(dto.password)

		 // 💡 Логируем хешированный пароль, чтобы убедиться, что он был создан
        console.log('Сгенерированный хешированный пароль:', hashedPassword);

		//eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = await this.userService.create({
			email: dto.email,
			password: hashedPassword
		})

		return { user }
	}

	private issueTokens(userId: string) {
		const data = { id: userId }

		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		})

		return { accessToken, refreshToken }
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.userService.getByEmail(dto.email)

		if (!user) throw new NotFoundException('User not found')

			console.log('Пароль из базы данных:', user.password);
    console.log('Пароль, введенный пользователем:', typeof(dto.password), dto.password);

		const isValid = await verify(user.password, dto.password)
		 console.log('isValid', isValid)

		// if (!isValid) throw new UnauthorizedException('Invalid password')

		return user
	}

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			domain: 'localhost',
			expires: expiresIn,
			secure: true,
			sameSite: 'none'
		})
	}

	removeRefreshTokenFromResponse(res: Response) {
		res.cookie(this.REFRESH_TOKEN_NAME, '', {
			httpOnly: true,
			domain: 'localhost',
			secure: true,
			sameSite: 'none'
		})
	}
}
