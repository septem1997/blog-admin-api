import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateAdminDto } from './admin/dto/create-admin.dto';
import { Result } from './util/result';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly authService: AuthService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Post('login')
  login(@Body() createAdminDto:CreateAdminDto): any {
    if (createAdminDto.username&&createAdminDto.password){
      return this.authService.login(createAdminDto)
    }else {
      return Result.login_pleaseEnter()
    }
  }

  @Post('changePassword')
  @UseGuards(AuthGuard('jwt'))
  async changePassword(
    @Req() request,
    @Body('newPwd') newPwd:string,
    @Body('oldPwd') oldPwd:string
  ): Promise<any> {
    return this.authService.updatePassword(request.user,oldPwd,newPwd)
  }
}
