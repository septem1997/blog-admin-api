import { Controller, Get, Post, Query,Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  login(@Body() body): string {
    if (body.username&&body.password){
      return body;
    }else {
      return this.appService.loginInfoEmpty()
    }
  }
}
