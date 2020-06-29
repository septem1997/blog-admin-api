import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Result } from '../util/result';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly  adminService: AdminService,
  ) {}

  validateUser(createAdminDto:CreateAdminDto):Promise<any>{
    return this.adminService.findOne(createAdminDto)
  }

  async login(createAdminDto:CreateAdminDto): Promise<any> {
    const findAdmin = await this.validateUser(createAdminDto)
    if (findAdmin){
      const pwdIsCorrect = await bcrypt.compare(createAdminDto.password, findAdmin.password)
      if (pwdIsCorrect){
        return Result.success(this.jwtService.sign(createAdminDto))
      }else {
        return Result.login_error()
      }
    }else {
      return Result.login_noExist()
    }
  }
}
