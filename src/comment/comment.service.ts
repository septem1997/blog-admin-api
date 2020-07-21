import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Result } from '../util/result';
const moment = require('moment');

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment)
    private repository: Repository<Comment>
  ) {}


  // async edit(createCommentDto: CreateCommentDto): Promise<any> {
  //   let user = new Comment()
  //   if (createCommentDto.id){  //区分编辑和新增
  //     user = await this.repository.createQueryBuilder('user')
  //       .where('user.id = :id', { id: createCommentDto.id })
  //       .getOne();
  //   }
  //   user.content = createCommentDto.content
  //   user.title = createCommentDto.title
  //   user.createTime = moment().format('YYYY-MM-DD HH:mm:ss')
  //   await this.repository.save(user)
  //   return Result.success()
  // }
  //
  async deleteBy(ids: Array<number>): Promise<any> {
    await this.repository.delete(ids)
    return Result.success()
  }
  //
  // async getComment(id:number){
  //   return Result.success(await this.repository.findOne(id))
  // }


  async getCommentList(commentDto: CreateCommentDto): Promise<any> {
    const qb =  this.repository.createQueryBuilder('comment')
      .leftJoinAndSelect("comment.user", "user")
      .leftJoinAndSelect("comment.article", "article")
      .select(['comment.id','user.username','article.title','comment.content',
        'comment.createTime'])
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
