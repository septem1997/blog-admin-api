import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

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
