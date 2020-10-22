import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { BaseEntity } from '../common/baseEntity';

@Entity()
export class User extends BaseEntity{

  @Column()
  username: string;

  @Column({select:false})
  password: string;

  @OneToMany(type => Comment,comment => comment.user)
  comments:Comment[]
}
