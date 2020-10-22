import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../common/baseEntity';

@Entity()
export class Admin extends BaseEntity{

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: true,select:false })
  isActive: boolean;
}
