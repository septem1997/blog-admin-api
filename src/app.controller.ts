import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req, UseInterceptors, UploadedFile,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AppService } from './app.service';
import { CreateAdminDto } from './admin/dto/create-admin.dto';
import { Result } from './util/result';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file): Promise<any> {
    const fileName = uuidv4()+'_'+file.originalname;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs-extra'),ObsClient = require('esdk-obs-nodejs')
    await fs.writeFileSync(fileName, file.buffer)
    const obsClient = new ObsClient({
      access_key_id: process.env.access_key_id,
      secret_access_key: process.env.secret_access_key,
      server: process.env.server
    });

    await new Promise((resolve,reject)=>{
      obsClient.putObject({
        Bucket: process.env.bucket,
        Key: 'blog/' + fileName,
        SourceFile: fileName
      }, (err, result) => {
        if (err) {
          reject('Error-->' + err);
        } else {
          resolve('Status-->' + result.CommonMsg.Status);
        }
      });
    })
    await fs.unlinkSync(fileName)
    return Result.success('https://'+process.env.bucket+'.'+process.env.server+'/blog/'+fileName)
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
