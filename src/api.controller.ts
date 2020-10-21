import {
  Controller,
  Get,
  Body,
  Req,
} from '@nestjs/common';
import { ArticleService } from './article/article.service';
import { Result } from './util/result';
import { CreateArticleDto } from './article/dto/create-article.dto';

@Controller('api')
export class ApiController {
  constructor(private readonly articleService:ArticleService ) {
  }

  @Get('homepage')
  async homepage(): Promise<any> {
    const query = new CreateArticleDto();
    query.pageNum = 1
    query.pageSize = 5
    const res = await this.articleService.getArticleList(query)
    return Result.success({
      last5Articles:res.data.list
    })
  }


  @Get('blogInfo')
  blogInfo(): any {
    // todo 新增访问量并返回一些博客配置（名称，标签，联系方式等）
    return Result.success({
      blogName:'壶中界'
    })
  }
}
