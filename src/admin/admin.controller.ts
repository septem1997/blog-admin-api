import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('admin')
export class AdminController {

  constructor(private readonly service: AdminService) {
  }

  @Post('edit')
  async edit(@Body() createAdminDto:CreateAdminDto): Promise<any> {
    if (createAdminDto.username && createAdminDto.password) {
      return this.service.create(createAdminDto)
    } else {
      return {
        code: 1001,
        msg: '请输入账号和密码',
        data: null
      }
    }
  }

  @Post('login')
  login(@Body() createAdminDto:CreateAdminDto): any {
    if (createAdminDto.username&&createAdminDto.password){
      return this.service.login(createAdminDto)
    }else {
      return {
        code: 1001,
        msg: '请输入账号和密码'
      }
    }
  }
}
