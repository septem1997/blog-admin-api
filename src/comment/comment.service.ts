import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Result } from '../util/result';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment)
    private repository: Repository<Comment>
  ) {}


  async deleteBy(ids: Array<number>): Promise<any> {
    const list = await this.repository.findByIds(ids);
    list.forEach(item => item.disabled = true)
    await this.repository.save(list)
    return Result.success()
  }


  async getCommentList(commentDto: CreateCommentDto): Promise<any> {
    const qb =  this.repository.createQueryBuilder('comment')
      .leftJoinAndSelect("comment.user", "user")
      .leftJoinAndSelect("comment.article", "article")
      .select(['comment.id','user.username','article.title','comment.content',
        'comment.createTime'])
      .where('comment.disabled = 0')
      if (commentDto.content){
        qb.andWhere('comment.content like :content', { content: `%${commentDto.content}%` })
      }
      if (commentDto.username){
        qb.andWhere('user.username like :username', { username: `%${commentDto.username}%` })
      }
      if (commentDto.articleTitle){
        qb.andWhere('article.title like :articleTitle', { articleTitle: `%${commentDto.articleTitle}%` })
      }
      const res = await qb
      .skip(commentDto.pageSize * (commentDto.pageNum - 1))
      .take(commentDto.pageSize)
      .orderBy('comment.id','DESC')
      .getManyAndCount()
    return Result.success({
      list:res[0],
      total:res[1]
    })
  }

}
