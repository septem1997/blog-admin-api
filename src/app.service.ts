import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  loginInfoEmpty(): any {
    return {
      code: 111,
      msg: '用户名或密码不能为空',
    };
  }
}
