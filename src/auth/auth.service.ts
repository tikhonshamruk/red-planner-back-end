import { UserService } from 'src/user/user.service';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
	constructor(
		private jwt: JwtService, 
		private userService: UserService
	){}
	async login(dto: AuthDto){
		//eslint-disable-next-line @typescript-eslint/no-unused-vars
		const {password, ...user} = await this.validateUser(dto);
		const tokens = this.issueTokens(user.id)

		return {
			user, 
			...tokens
		}
	}

	async register(dto: AuthDto){
		const oldUser = await this.userService.getByEmail(dto.email)

		if(oldUser) throw new BadRequestException('User already exits')

		//eslint-disable-next-line @typescript-eslint/no-unused-vars
		const  {password, ...user} = await this.userService.create(dto)

		return {user}
	}

	private issueTokens(userId:string){
		const data = {id: userId}

		const accessToken= this.jwt.sign(data,{
			expiresIn: '1h'
		})

		const refreshToken = this.jwt.sign(data,{
			expiresIn: '7d'
		})

		return {accessToken, refreshToken}
 	}

	private async validateUser(dto: AuthDto){

		const user = await this.userService.getByEmail(dto.email)

		if(!user) throw new NotFoundException('User not found')

		const isValid = await verify(user.password, dto.password)

		if(!isValid) throw new UnauthorizedException('Invalid password')

		return user

}
}

