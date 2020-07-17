import { Body, Controller, Get, Post, UseGuards, Query, Param } from '@nestjs/common';
import { ArticleService } from './Article.service';
import { Result } from '../util/result';
import { AuthGuard } from '@nestjs/passport';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('Article')
export class ArticleController {

  constructor(private readonly service: ArticleService) {
  }

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async getArticleList(createArticleDto: CreateArticleDto):Promise<any>{
    return this.service.getArticleList(createArticleDto)
  }

  @Get(':id')
  getArticle(@Param('id') id:number): Promise<any> {
   return this.service.getArticle(id)
  }

  @Post('edit')
  @UseGuards(AuthGuard('jwt'))
  async edit(@Body() createArticleDto:CreateArticleDto): Promise<any> {
    if (createArticleDto.content && createArticleDto.title) {
      return this.service.edit(createArticleDto)
    } else {
      return Result.article_plzEnter()
    }
  }

  @Post('delete')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Body('ids') ids:Array<number>): Promise<any> {
    return this.service.deleteBy(ids)
  }
}
