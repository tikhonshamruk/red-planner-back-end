import { CurrentUser } from './../auth/decorators/user.decorator'
import {
  Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { TaskService } from './task.service'
import { JwtAuthGuard } from 'src/auth/quards/jwt.quard'
import { TaskDto } from './task.dto'

@Controller('user/task')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Get()
	@UseGuards(JwtAuthGuard)
	async getAll(@CurrentUser('id') id: string) {
		return this.taskService.getAll(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@UseGuards(JwtAuthGuard)
	async create(@Body() dto: TaskDto, @CurrentUser('id') id: string) {
		return this.taskService.create(dto, id)
	}

  @UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@UseGuards(JwtAuthGuard)
	async update(@Body() dto: TaskDto, @CurrentUser('id') userId: string, @Param('id')taskId: string) {
		return this.taskService.update(dto, userId, taskId)
	}

  @UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async delete( @Param('id')taskId: string) {
		return this.taskService.delete(taskId)
	}
}
