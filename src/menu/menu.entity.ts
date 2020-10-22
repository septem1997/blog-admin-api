import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/baseEntity';

@Entity()
export class Menu extends BaseEntity{

  @Column()
  title: string;

  @Column()
  name: string;

  @Column({nullable:true})
  icon: string;

  @ManyToOne(type => Menu, menu => menu.children)
  parent:Menu

  @OneToMany(type => Menu, menu => menu.parent)
  children:Menu[]

  @Column({ default: true,select:false })
  isActive: boolean;
}
