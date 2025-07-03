import { IsInt, IsOptional, IsString } from "class-validator"

export class TimeBlockDto{
    @IsOptional()
        @IsString()
        name: string
    
        @IsString()
        @IsOptional()
        color: string

        @IsInt()
        @IsOptional()
        duration: number

        @IsOptional()
        @IsInt()
        order:number
}