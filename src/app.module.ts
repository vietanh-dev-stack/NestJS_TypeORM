import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from 'src/modules/post/post.module';
import { DatabaseModule } from 'src/db/database.service';
import { CommentModule } from 'src/modules/comment/comment.module';
import { LikeModule } from 'src/modules/like/like.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    PostModule,
    CommentModule,
    LikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
