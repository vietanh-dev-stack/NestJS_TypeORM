import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCateDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;
}
