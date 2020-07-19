import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({type:'text'})
  content: string;

  @Column({type:'datetime'})
  createTime:string;

  @Column({default:0})
  viewNum:number;



}
