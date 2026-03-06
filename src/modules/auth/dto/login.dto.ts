/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsString } from "class-validator"


export class LoginDto {
    @IsString()
    name: string

    @IsString()
    password: string
}