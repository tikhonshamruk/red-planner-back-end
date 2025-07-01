import { Controller, Get, HttpCode, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/quards/jwt.quard';

@Controller('user/profile')
export class UserController {
  constructor(private readonly userService: UserService) {}


    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Get()
    @UseGuards(JwtAuthGuard)
       async getProfile(@CurrentUser('id') id : string){
        const user = await this.userService.getProfile(id)
        return user
      }
 
}
