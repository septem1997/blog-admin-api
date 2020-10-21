import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { Tag } from '../tag/tag.entity';
const moment = require('moment');

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  summary: string;

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

  @Column({default:0})
  viewNum:number;

  @OneToMany(type => Comment,comment => comment.user)
  comments:Comment[]


  @ManyToMany(type => Tag, tag => tag.articles)
  @JoinTable()
  tags:Tag[]
}
