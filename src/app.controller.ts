import { Controller, Get, Post, Query,Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateAdminDto } from './admin/dto/create-admin.dto';
import { Result } from './util/result';
import { AuthService } from './auth/auth.service';

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
}
