import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Put,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CommentService } from 'src/modules/comment/comment.service';
import { CreateCommentDto } from 'src/modules/comment/dto/create-comment.dto';
import { UpdateCommentDto } from 'src/modules/comment/dto/update-comment.dto';

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(Number(id));
  }

  @Post('/posts/:postId')
  create(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
    @Request() req: any,
  ) {
    const userId = req.user.id;
    return this.commentService.create(dto, userId, Number(postId));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCommentDto,
    @Request() req: any,
  ) {
    const userId = req.user.id;
    return this.commentService.update(Number(id), dto, userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.id;
    return this.commentService.delete(Number(id), userId);
  }
}