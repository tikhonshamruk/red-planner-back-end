import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

// Эта функция будет создавать объект с настройками для JwtModule
export const getJwtConfig = async (
  configService: ConfigService
): Promise<JwtModuleOptions> => ({
    secret: configService.get('JWT_SECRET')
})