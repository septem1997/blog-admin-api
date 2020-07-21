import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Article } from '../article/article.entity';
const moment = require('moment');

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'text'})
  content: string;

  @Column({type:"datetime", transformer:{
      from(value: any): any {
        return moment(value).format('YYYY年MM月DD日 HH:mm:ss')
      },
      to(value: any): any {
        return value
      }
    }})
  createTime:string;

  @ManyToOne(type => User,user => user.comments)
  user:User

  @ManyToOne(type => Article, article => article.comments)
  article:Article
}
