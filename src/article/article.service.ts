import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { Result } from '../util/result';
import { TagService } from '../tag/tag.service';

const moment = require('moment');

@Injectable()
export class ArticleService {

  constructor(
    @InjectRepository(Article)
    private repository: Repository<Article>,
    private tagService: TagService
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
    if (createArticleDto.tagIds){
      article.tags = await this.tagService.getTagByIds(createArticleDto.tagIds)
    }
    article.summary = createArticleDto.summary
    article.createTime = moment().format('YYYY-MM-DD HH:mm:ss')
    await this.repository.save(article)
    return Result.success()
  }

  async deleteBy(ids: Array<number>): Promise<any> {
    const list = await this.repository.findByIds(ids);
    list.forEach(item => item.disabled = true)
    await this.repository.save(list)
    return Result.success()
  }

  async getArticle(id:number){
    return Result.success(await this.repository.findOne(id))
  }


  async getArticleList(articleDto: CreateArticleDto): Promise<any> {
    const qb =  this.repository.createQueryBuilder('article')
      .select(['article.id','article.title','article.summary','article.viewNum','article.createTime'])
      .where('article.disabled = 0')
      if (articleDto.title){
        qb.andWhere('article.title like :title', { title: `%${articleDto.title}%` })
      }
      const res = await qb
      .skip(articleDto.pageSize * (articleDto.pageNum - 1))
      .take(articleDto.pageSize)
      .orderBy(articleDto.sortField,articleDto.sortValue)
      .getManyAndCount()
    return Result.success({
      list:res[0],
      total:res[1]
    })
  }

}
