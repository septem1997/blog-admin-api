import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Result } from '../util/result';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller('admin')
export class AdminController {

  constructor(private readonly service: AdminService) {
  }

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async getAdminList():Promise<any>{
    return this.service.getAdminList()
  }

  @Post('edit')
  async edit(@Body() createAdminDto:CreateAdminDto): Promise<any> {
    if (createAdminDto.username && createAdminDto.password) {
      return this.service.create(createAdminDto)
    } else {
      return Result.login_pleaseEnter()
    }
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Body() createAdminDto:CreateAdminDto): any {
    if (createAdminDto.username&&createAdminDto.password){
      return this.service.login(createAdminDto)
    }else {
      return Result.login_pleaseEnter()
    }
  }
}
