import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  register(pass: string):Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(pass, saltRounds);
  }

  async create(createAdminDto: CreateAdminDto): Promise<any> {
    const query  = new Admin()
    query.username = createAdminDto.username
    const findAdmin = await this.adminRepository.findOne(query)
    if (findAdmin){
      return {
        code:1006,
        msg:'该用户名已存在'
      }
    }else {
      const admin = new Admin()
      const newPass = await this.register(createAdminDto.password)
      admin.username = createAdminDto.username
      admin.password = newPass
      await this.adminRepository.save(admin)
      return {
        code:0,
        msg:'创建管理员账号成功'
      }
    }

  }

  findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  findOne(id: string): Promise<Admin> {
    return this.adminRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.adminRepository.delete(id);
  }

  async login(createAdminDto: CreateAdminDto):Promise<any> {
    const query  = new Admin()
    query.username = createAdminDto.username
    const findAdmin = await this.adminRepository.findOne(query)
    if (findAdmin){
      const pwdIsCorrect = await bcrypt.compare(createAdminDto.password, findAdmin.password)
      if (pwdIsCorrect){
        return {
          code:0
        }
      }else {
        return {
          code: 1004,
          msg: '账号或密码不正确'
        }
      }
    }else {
      return {
        code: 1003,
        msg: '账号不存在'
      }
    }
  }
}
