import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
import { Result } from '../util/result';

@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(Admin)
    private repository: Repository<Admin>
  ) {}

  register(pass: string):Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(pass, saltRounds);
  }

  async create(createAdminDto: CreateAdminDto): Promise<any> {
    const query  = new Admin()
    query.username = createAdminDto.username
    const findAdmin = await this.repository.findOne(query)
    if (findAdmin){
      return Result.login_accountExist()
    }else {
      const admin = new Admin()
      const newPass = await this.register(createAdminDto.password)
      admin.username = createAdminDto.username
      admin.password = newPass
      await this.repository.save(admin)
      return Result.success()
    }

  }

  async updatePassword(admin: Admin, newPwd: string) {
    admin.password = await this.register(newPwd)
    await this.repository.save(admin)
    return Result.success()
  }

  async deleteBy(ids: Array<number>): Promise<any> {
    const list = await this.repository.findByIds(ids);
    list.forEach(item => item.disabled = true)
    await this.repository.save(list)
    return Result.success()
  }

  async findOne(createAdminDto: CreateAdminDto):Promise<Admin> {
    const query = new Admin()
    query.username = createAdminDto.username
    return await this.repository.findOne(query)
  }

  async getAdminList(createAdminDto:CreateAdminDto): Promise<any> {
    const res = await this.repository.createQueryBuilder('admin')
      .select(['admin.id','admin.username'])
      .where('admin.disabled = 0')
      .skip(createAdminDto.pageSize * (createAdminDto.pageNum - 1))
      .take(createAdminDto.pageSize)
      .getManyAndCount()
    return Result.success({
      list:res[0],
      total:res[1]
    })
  }


}
