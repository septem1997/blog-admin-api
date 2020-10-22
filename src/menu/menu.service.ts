import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Result } from '../util/result';

@Injectable()
export class MenuService {

  constructor(
    @InjectRepository(Menu)
    private repository: Repository<Menu>
  ) {}


  async create(createMenuDto: CreateMenuDto): Promise<any> {

    let menu = new Menu()
    if (createMenuDto.id){  //区分编辑和新增
      menu = await this.repository.createQueryBuilder('menu')
        .where('menu.id = :id', { id: createMenuDto.id })
        .getOne();
    }else {
      if (createMenuDto.parentId&&createMenuDto.parentId!==0){
        const query  = new Menu()
        query.id = createMenuDto.parentId
        menu.parent = await this.repository.findOne(query)
      }
    }
    menu.name = createMenuDto.name
    menu.title = createMenuDto.title
    menu.icon = createMenuDto.icon
    await this.repository.save(menu)
    return Result.success()
  }

  async deleteOne(id: number): Promise<any> {
    const menu = await this.repository.findOne(id);
    menu.disabled = true
    await this.repository.save(menu)
    return Result.success()
  }

  async getMenuList(): Promise<any> {
    const list = await this.repository.createQueryBuilder('menu')
      .where('menu.parentId is null and menu.disabled = 0')
      .getMany();
    for (const menu of list){
      menu.children = await this.repository.createQueryBuilder('menu')
        .where('menu.parentId = :id',{id:menu.id})
        .getMany()
    }
    return Result.success(list)
  }

}
