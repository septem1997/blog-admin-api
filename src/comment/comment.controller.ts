import { Body, Controller, Get, Post, Query, Param, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Result } from '../util/result';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {

  constructor(private readonly service: CommentService) {
  }

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async getCommentList(@Query() createCommentDto: CreateCommentDto):Promise<any>{
    return this.service.getCommentList(createCommentDto)
  }

  //
  // @Post('edit')
  // @UseGuards(AuthGuard('jwt'))
  // async edit(@Body() createCommentDto:CreateCommentDto): Promise<any> {
  //   if (createCommentDto.content && createCommentDto.title) {
  //     return this.service.edit(createCommentDto)
  //   } else {
  //     return Result.Comment_plzEnter()
  //   }
  // }

  @Post('delete')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Body('ids') ids:Array<number>): Promise<any> {
    return this.service.deleteBy(ids)
  }
}
