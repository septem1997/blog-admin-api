import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { Result } from '../util/result';

@Injectable()
export class TagService {

  constructor(
    @InjectRepository(Tag)
    private repository: Repository<Tag>,
  ) {}


  async edit(createTagDto: CreateTagDto): Promise<any> {
    let tag = new Tag();
    if (createTagDto.id) {  //区分编辑和新增
      tag = await this.repository.createQueryBuilder('tag')
        .where('tag.id = :id', { id: createTagDto.id })
        .getOne();
    }
    tag.name = createTagDto.name;
    await this.repository.save(tag);
    return Result.success();
  }


  async deleteBy(ids: Array<number>): Promise<any> {
    await this.repository.delete(ids);
    return Result.success();
  }

  getTagByIds(ids:number[]){
    return this.repository.findByIds(ids)
  }

  async getTagList(tagDto: CreateTagDto): Promise<any> {
    const qb = this.repository.createQueryBuilder('tag')
      .select(['tag.id', 'tag.name'])
      .leftJoinAndSelect('tag.articles', 'article')// todo 待改
    if (tagDto.name) {
      qb.andWhere('tag.name like :name', { content: `%${tagDto.name}%` });
    }
    if (tagDto.articleTitle) {
      qb.andWhere('article.title like :articleTitle', { articleTitle: `%${tagDto.articleTitle}%` });
    }
    const res = await qb
      .skip(tagDto.pageSize * (tagDto.pageNum - 1))
      .take(tagDto.pageSize)
      .orderBy('tag.id', 'DESC')
      .getManyAndCount();
    return Result.success({
      list: res[0],
      total: res[1],
    });
  }
}
