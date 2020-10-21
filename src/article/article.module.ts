import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Article } from './article.entity';
import { TagService } from '../tag/tag.service';
import { Tag } from '../tag/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article,Tag])],
  providers: [ArticleService,TagService],
  controllers: [ArticleController],
  exports: [TypeOrmModule,ArticleService],
})
export class ArticleModule {}
