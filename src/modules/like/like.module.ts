import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from 'src/modules/like/like.entity';
import { Module } from '@nestjs/common';
import { LikeController } from 'src/modules/like/like.controller';
import { LikeService } from 'src/modules/like/like.service';

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
