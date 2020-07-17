import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { Result } from '../util/result';
import moment from 'moment';

@Injectable()
export class ArticleService {

  constructor(
    @InjectRepository(Article)
    private repository: Repository<Article>
  ) {}


  async edit(createArticleDto: CreateArticleDto): Promise<any> {

    let article = new Article()
    if (createArticleDto.id){  //区分编辑和新增
      article = await this.repository.createQueryBuilder('article')
        .where('article.id = :id', { id: createArticleDto.id })
        .getOne();
    }
    article.content = createArticleDto.content
    article.title = createArticleDto.title
    article.createTime = moment().format('YYYY-MM-DD HH:MM:SS')
    await this.repository.save(article)
    return Result.success()
  }

  async deleteBy(ids: Array<number>): Promise<any> {
    await this.repository.delete(ids)
    return Result.success()
  }

  async getArticle(id:number){
    return Result.success(this.repository.findOne(id))
  }


  async getArticleList(createArticleDto: CreateArticleDto): Promise<any> {
    const res = await this.repository.createQueryBuilder('article')
      .select(['article.id','article.title','article.viewNum','article.createTime'])
      .skip(createArticleDto.pageSize * (createArticleDto.pageNum - 1))
      .take(createArticleDto.pageSize)
      .getManyAndCount()
    return Result.success({
      list:res[0],
      total:res[1]
    })
  }

}
