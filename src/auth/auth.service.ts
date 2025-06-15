import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    getHello(): string {
		return 'I`m so fucking love you! You are my insiration!'
	}
}

