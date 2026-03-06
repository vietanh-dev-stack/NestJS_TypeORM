/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";


export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}