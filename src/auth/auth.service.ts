import { UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
	constructor(
		private jwt: JwtService, 
		private UserService: UserService
	){}
	 login(dto: AuthDto){
		return dto
	}
}

