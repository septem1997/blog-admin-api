import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Article } from '../article/article.entity';
import { BaseEntity } from '../common/baseEntity';

@Entity()
export class Comment extends BaseEntity{

  @Column({type:'text'})
  content: string;

  @ManyToOne(type => User,user => user.comments)
  user:User

  @ManyToOne(type => Article, article => article.comments)
  article:Article
}
