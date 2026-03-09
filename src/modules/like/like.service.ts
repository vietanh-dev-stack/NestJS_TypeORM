import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from 'src/modules/like/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  async getLikes(): Promise<Like[]> {
    return this.likeRepository.find();
  }

  async likePost(userId: number, postId: number) {
    const existing = await this.likeRepository.findOne({
      where: { userId, postId },
    });
    if (existing) {
      return { message: 'Already liked' };
    }
    const like = this.likeRepository.create({ userId, postId });
    return this.likeRepository.save(like);
  }

  async unlikePost(userId: number, id: number) {
    await this.likeRepository.delete({ userId, id });
  }
}
