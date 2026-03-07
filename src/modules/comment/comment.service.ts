import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/modules/comment/comment.entity';
import { CreateCommentDto } from 'src/modules/comment/dto/create-comment.dto';
import { UpdateCommentDto } from 'src/modules/comment/dto/update-comment.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  async findOne(id: number): Promise<Comment | null> {
    return this.commentRepository.findOne({
      where: { id },
    });
  }

  async create(
    createCommentDto: CreateCommentDto,
    userId: number,
    postId: number,
  ) {
    const comment = this.commentRepository.create({
      ...createCommentDto,
      userId,
      postId,
    });
    return await this.commentRepository.save(comment);
  }

  async update(id: number, data: UpdateCommentDto, userId: number) {
    const comment = await this.findOne(id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if (userId !== comment.userId) {
      throw new ForbiddenException('You do not have permission to edit');
    }
    await this.commentRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number, userId: number) {
    const comment = await this.findOne(id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if (userId !== comment.userId) {
      throw new ForbiddenException('You do not have permission to delete');
    }
    await this.commentRepository.delete(id);
    return { message: 'Comment deleted successfully' };
  }
}
