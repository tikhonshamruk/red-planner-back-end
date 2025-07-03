import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TimeBlockDto } from './time-block.dto';

@Injectable()
export class TimeBlockService {
    constructor(private prisma: PrismaService){}

    async getAll(userId:string){
        return await this.prisma.timeBlock.findMany({
            where:{
                userId: userId
            }
        })
    }

    async create(dto: TimeBlockDto, userId: string){
        return this.prisma.timeBlock.create({
            data:{
                ...dto,
                user:{
                    connect:{
                        id: userId
                    }
                }
            }
        })
    }

    async update(dto:TimeBlockDto, userId: string, blockId:string){
        return this.prisma.timeBlock.update({
            where: {
                userId,
                id: blockId
            },
            data: dto
        })
    }

    async delete(blockId:string){
        return this.prisma.timeBlock.delete({
            where:{
                id: blockId
            }
        })
    }
}
