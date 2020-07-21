import { Body, Controller, Get, Post, Query, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Result } from '../util/result';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {

  constructor(private readonly service: UserService) {
  }

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async getUserList(@Query() createUserDto: CreateUserDto):Promise<any>{
    return this.service.getUserList(createUserDto)
  }

  //
  // @Post('edit')
  // @UseGuards(AuthGuard('jwt'))
  // async edit(@Body() createUserDto:CreateCommentDto): Promise<any> {
  //   if (createUserDto.content && createUserDto.title) {
  //     return this.service.edit(createUserDto)
  //   } else {
  //     return Result.User_plzEnter()
  //   }
  // }
  //
  // @Post('delete')
  // @UseGuards(AuthGuard('jwt'))
  // async delete(@Body('ids') ids:Array<number>): Promise<any> {
  //   return this.service.deleteBy(ids)
  // }
}
