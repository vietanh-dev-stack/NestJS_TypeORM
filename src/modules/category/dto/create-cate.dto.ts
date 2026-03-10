import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCateDto {
  @IsString()
  @MinLength(3)
  name: string;
}
