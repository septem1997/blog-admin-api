import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { Tag } from '../tag/tag.entity';
import { BaseEntity } from '../common/baseEntity';

@Entity()
export class Article extends BaseEntity{

  @Column()
  title: string;

  @Column()
  summary: string;

  @Column({type:'text'})
  content: string;

  @Column({default:0})
  viewNum:number;

  @OneToMany(type => Comment,comment => comment.user)
  comments:Comment[]


  @ManyToMany(type => Tag, tag => tag.articles)
  @JoinTable()
  tags:Tag[]
}
