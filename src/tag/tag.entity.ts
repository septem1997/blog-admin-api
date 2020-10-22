import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Article } from '../article/article.entity';
import { BaseEntity } from '../common/baseEntity';

@Entity()
export class Tag extends BaseEntity{

  @Column()
  name: string;

  @ManyToMany(type => Article, article => article.tags)
  articles:Article[]
}
