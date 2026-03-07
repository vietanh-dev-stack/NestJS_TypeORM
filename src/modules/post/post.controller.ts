import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CreatePostDto } from 'src/modules/post/dto/create-post.dto';
import { UpdatePostDto } from 'src/modules/post/dto/update-post.dto';
import { PostService } from 'src/modules/post/post.service';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(Number(id));
  }

  @Post()
  create(@Body() dto: CreatePostDto, @Request() req: any) {
    const userId = req.user.id;
    return this.postService.create(dto, userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePostDto, @Request() req: any) {
    const userId = req.user.id;
    return this.postService.update(Number(id), dto, userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.id;
    return this.postService.delete(Number(id), userId);
  }
}
