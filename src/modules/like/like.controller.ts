import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Post,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { LikeService } from 'src/modules/like/like.service';

@UseGuards(JwtAuthGuard)
@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Get()
  getAll() {
    return this.likeService.getLikes();
  }

  @Post(':id')
  create(@Request() req: any, @Param('id') id: string) {
    const userId = req.user.id;
    return this.likeService.likePost(userId, Number(id));
  }

  @Delete(':id')
  delete(@Request() req: any, @Param('id') id: string) {
    const userId = req.user.id;
    return this.likeService.unlikePost(userId, Number(id));
  }
}
