import { Body, Controller, HttpCode, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
     async login(@Body() dto: AuthDto, @Res({passthrough: true}) res:Response){
      const {refreshToken, ...response} = await this.authService.login(dto)
      this.authService.addRefreshTokenToResponse(res, refreshToken) //добавлям refrehsToken в cookie
      return response
    }
    

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  register(@Body() dto: AuthDto){
      return this.authService.register(dto)
    }


  //   @HttpCode(200)
  // @Post('login/access-token')
  // async getNewTokens(@Req() req: Request, @Res({passthrough: true}) res: Response){
  //     const refreshTokenFromCookies = 
  //     req.cookies[this.authService.REFRESH_TOKEN_NAME]

  //     if(!refreshTokenFromCookies){
  //       this.authService.removeRefreshTokenFromResponse(res)
  //       throw new UnauthorizedException('Refresh token not passed')
  //     }
  //   }
} 
