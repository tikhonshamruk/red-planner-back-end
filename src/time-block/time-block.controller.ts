import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TimeBlockService } from './time-block.service';
import { JwtAuthGuard } from 'src/auth/quards/jwt.quard';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { TimeBlockDto } from './time-block.dto';

@Controller('user/time-block')
export class TimeBlockController {
  constructor(private readonly timeBlockService: TimeBlockService) {}

  @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Get()
    @UseGuards(JwtAuthGuard)
    async getAll(@CurrentUser('id') id: string) {
      return this.timeBlockService.getAll(id)
    }

    
      @UsePipes(new ValidationPipe())
      @HttpCode(200)
      @Post()
      @UseGuards(JwtAuthGuard)
      async create(@Body() dto: TimeBlockDto, @CurrentUser('id') id: string) {
        return this.timeBlockService.create(dto, id)
      }
  
      @UsePipes(new ValidationPipe())
        @HttpCode(200)
        @Put(':id')
        @UseGuards(JwtAuthGuard)
        async update(@Body() dto: TimeBlockDto, @CurrentUser('id') userId: string, @Param('id')blockId: string) {
          return this.timeBlockService.update(dto, userId, blockId)
        }
      
        @UsePipes(new ValidationPipe())
        @HttpCode(200)
        @Delete(':id')
        @UseGuards(JwtAuthGuard)
        async delete( @Param('id')blockId: string) {
          return this.timeBlockService.delete(blockId)
        }
}
