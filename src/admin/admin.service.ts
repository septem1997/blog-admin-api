import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
import { Result } from '../util/result';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private authService: AuthService
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
      return Result.login_accountExist()
    }else {
      const admin = new Admin()
      const newPass = await this.register(createAdminDto.password)
      admin.username = createAdminDto.username
      admin.password = newPass
      await this.adminRepository.save(admin)
      return Result.success()
    }

  }

  async findOne(createAdminDto: CreateAdminDto):Promise<Admin> {
    const query = new Admin()
    query.username = createAdminDto.username
    return await this.adminRepository.findOne(query)
  }

  async getAdminList(): Promise<any> {
    const query = new Admin()
    const list = await this.adminRepository.find(query);
    return Result.success(list)
  }


  async remove(id: string): Promise<void> {
    await this.adminRepository.delete(id);
  }

  async login(createAdminDto: CreateAdminDto):Promise<any> {
    return this.authService.validateUser(createAdminDto)
  }
}
