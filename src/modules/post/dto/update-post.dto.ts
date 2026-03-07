import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';

export class UpdatePostDto {
  @Optional()
  @IsString()
  title?: string;

  @Optional()
  @IsString()
  content?: string;
}
