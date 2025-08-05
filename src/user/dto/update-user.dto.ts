import {
	IsEmail,
	IsInt,
	IsOptional,
	IsString,
	Min,
	MinLength
} from 'class-validator'

export class UpdateUserDto {
	@IsOptional()
	@IsEmail({}, { message: 'Invalid email' })
	email?: string

	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	@IsString()
	@MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
	password?: string

	@IsOptional()
	@IsInt()
	@Min(1)
	workInterval?: number

	@IsOptional()
	@IsInt()
	@Min(1)
	breakInterval?: number

	@IsOptional()
	@IsInt()
	@Min(1)
	intervalsCount?: number
}
