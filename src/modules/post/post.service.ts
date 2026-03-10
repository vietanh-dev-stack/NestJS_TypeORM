import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/modules/post/dto/create-post.dto';
import { UpdatePostDto } from 'src/modules/post/dto/update-post.dto';
import { Post } from 'src/modules/post/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: ['user', 'category'],
    });
  }

  async findOne(id: number): Promise<Post | null> {
    return this.postRepository.findOne({
      where: { id },
      relations: ['user', 'category', 'comments', 'likes'],
    });
  }

  async create(createPostDto: CreatePostDto, userId: number) {
    const post = this.postRepository.create({ ...createPostDto, userId });
    return this.postRepository.save(post);
  }

  async update(id: number, data: UpdatePostDto, userId: number) {
    const post = await this.findOne(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (userId !== post.userId) {
      throw new ForbiddenException('You do not have permission to edit');
    }
    await this.postRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number, userId: number) {
    const post = await this.findOne(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (userId !== post.userId) {
      throw new ForbiddenException('You do not have permission to delete');
    }
    await this.postRepository.delete(id);
    return { message: 'Post deleted successfully' };
  }
}
