import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {

    constructor(
        private prisma: PrismaService
    ){
    }

    async getAll(userId: string){
        return await this.prisma.task.findMany({
            where: {
                userId
            }
        })
    }

    async create(dto: TaskDto, userId: string){
        return this.prisma.task.create({
            data: {
                ...dto, 
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
    }

    async update(dto: TaskDto,  userId: string, taskId: string){
        return this.prisma.task.update({
            where: {
                userId, 
                id: taskId
            }, 
            data: dto
        })
    }
    
    async delete(taskId: string){
        return this.prisma.task.delete({
            where:{
                id: taskId
            }
        })
    }
    
}
