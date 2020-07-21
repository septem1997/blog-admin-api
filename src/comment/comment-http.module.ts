import { Module } from '@nestjs/common';
import { CommentModule } from './comment.module';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  imports: [CommentModule],
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentHttpModule {}
