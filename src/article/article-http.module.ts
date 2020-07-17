import { Module } from '@nestjs/common';
import { ArticleModule } from './article.module';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';

@Module({
  imports: [ArticleModule],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleHttpModule {}
