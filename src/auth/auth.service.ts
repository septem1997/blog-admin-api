import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Result } from '../util/result';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { Admin } from '../admin/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly  adminService: AdminService,
  ) {}

  async updatePassword(currentUser: Admin, oldPassword: string, newPassword: string) {
    const pwdIsCorrect = await bcrypt.compare(oldPassword, currentUser.password)
    if (pwdIsCorrect){
      return this.adminService.updatePassword(currentUser,newPassword)
    }else {
      return Result.app_pwdError()
    }
  }

  async validateUser(createAdminDto: CreateAdminDto): Promise<Admin> {
    return await this.adminService.findOne(createAdminDto)
  }

  async login(createAdminDto:CreateAdminDto): Promise<any> {
    const findAdmin = await this.adminService.findOne(createAdminDto)
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
