import { Body, Controller, Get, Post, Query, Param, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { Result } from '../util/result';
import { AuthGuard } from '@nestjs/passport';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tag')
export class TagController {

  constructor(private readonly service: TagService) {
  }

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async getTagList(@Query() createTagDto: CreateTagDto):Promise<any>{
    return this.service.getTagList(createTagDto)
  }


  @Post('edit')
  @UseGuards(AuthGuard('jwt'))
  async edit(@Body() createTagDto:CreateTagDto): Promise<any> {
    if (createTagDto.name) {
      return this.service.edit(createTagDto)
    } else {
      return Result.tag_plzEnter()
    }
  }

  @Post('delete')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Body('ids') ids:Array<number>): Promise<any> {
    return this.service.deleteBy(ids)
  }
}
