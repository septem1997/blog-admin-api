function fillRes(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const oldFun = descriptor.value
  descriptor.value = function (...rest) {
    const res =  oldFun.apply(this, rest)
    if (!res.code){
      res.code = 0
    }
    if (!res.msg){
      res.msg = '成功'
    }
    return res
  }
}

export class Result{

  @fillRes
  static success(data?){
    return {
      data
    }
  }

  @fillRes
  static login_noExist(){
    return {
      code: 1003,
      msg: '账号不存在'
    }
  }

  @fillRes
  static login_error(){
    return{
      code: 1004,
      msg: '账号或密码不正确'
    }
  }

  @fillRes
  static login_accountExist(){
    return{
      code:1006,
      msg:'该用户名已存在'
    }
  }

  @fillRes
  static login_pleaseEnter(){
    return{
      code: 1001,
      msg: '请输入账号和密码'
    }
  }

  @fillRes
  static menu_pleaseEnter(){
    return{
      code: 2001,
      msg: '请输入路径和标题'
    }
  }


}
