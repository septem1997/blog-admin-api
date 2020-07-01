import { Body, Controller, Get, Post, UseGuards,Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Result } from '../util/result';
import { AuthGuard } from '@nestjs/passport';
import { CreateMenuDto } from './dto/create-menu.dto';

@Controller('menu')
export class MenuController {

  constructor(private readonly service: MenuService) {
  }

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async getMenuList():Promise<any>{
    return this.service.getMenuList()
  }

  @Post('edit')
  @UseGuards(AuthGuard('jwt'))
  async edit(@Body() createMenuDto:CreateMenuDto): Promise<any> {
    if (createMenuDto.name && createMenuDto.title) {
      return this.service.create(createMenuDto)
    } else {
      return Result.menu_pleaseEnter()
    }
  }

  @Post('delete')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Query('id') id:number): Promise<any> {
    return this.service.deleteOne(id)
  }

}
