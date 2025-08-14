import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { PrismaService } from 'src/prisma.service'
import { startOfDay, subDays } from 'date-fns'
import { UpdateUserDto } from './dto/update-user.dto'


@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id
			},
			include: {
				tasks: true
			}
		})
	}

	getByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: {
				email
			}
		})
	}

	async create(dto: AuthDto, hash:string){
		const user= {
			email: dto.email,
			name: '',
			password: hash
		}

		return this.prisma.user.create({
			data: user
		})
	}

	async update(dto: UpdateUserDto, id: string){
		return this.prisma.user.update({
			where: {id },
			data: dto
		})
	}

	async getProfile(id: string){
		const profile = await this.getById(id)

		const totalTasks = profile?.tasks.length

		const completedTasks = await this.prisma.task.count({
			where: {
				userId: id, 
				isComleted: true 
			}
		})

		const todayStart = startOfDay(new Date())

		const weekStart = startOfDay(subDays(new Date(),7))

		const todayTasks = await this.prisma.task.count({
			where: {
				userId: id, 
				createdAt: {
					gte: todayStart
				}
			}
		})

		const weekTasks = await this.prisma.task.count({
			where: {
				userId: id, 
				createdAt: {
					gte: weekStart
				}
			}
		})

		return {
			user: profile, 
			statistics: [
				{label: 'Total', value: totalTasks},
				{label: 'Completed tasks', value: completedTasks},
				{label: 'Today tasks', value: todayTasks},
				{label: 'Week tasks', value: weekTasks},
			]
		}
	}

	
}
