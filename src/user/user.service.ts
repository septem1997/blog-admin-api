import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Result } from '../util/result';
const moment = require('moment');

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private repository: Repository<User>
  ) {}


  // async edit(createUserDto: CreateCommentDto): Promise<any> {
  //   let user = new User()
  //   if (createUserDto.id){  //区分编辑和新增
  //     user = await this.repository.createQueryBuilder('user')
  //       .where('user.id = :id', { id: createUserDto.id })
  //       .getOne();
  //   }
  //   user.content = createUserDto.content
  //   user.title = createUserDto.title
  //   user.createTime = moment().format('YYYY-MM-DD HH:mm:ss')
  //   await this.repository.save(user)
  //   return Result.success()
  // }
  //
  // async deleteBy(ids: Array<number>): Promise<any> {
  //   await this.repository.delete(ids)
  //   return Result.success()
  // }
  //
  // async getUser(id:number){
  //   return Result.success(await this.repository.findOne(id))
  // }


  async getUserList(userDto: CreateUserDto): Promise<any> {
    const qb =  this.repository.createQueryBuilder('user')
      .select(['user.id','user.username','user.createTime'])
      if (userDto.username){
        qb.andWhere('User.username like :username', { username: `%${userDto.username}%` })
      }
      const res = await qb
      .skip(userDto.pageSize * (userDto.pageNum - 1))
      .take(userDto.pageSize)
      .orderBy('id','DESC')
      .getManyAndCount()
    return Result.success({
      list:res[0],
      total:res[1]
    })
  }

}
