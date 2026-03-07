import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from 'src/modules/comment/comment.controller';
import { Comment } from 'src/modules/comment/comment.entity';
import { CommentService } from 'src/modules/comment/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
