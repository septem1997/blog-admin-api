import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(createAdminDto:CreateAdminDto): Promise<any> {
    const user = await this.authService.validateUser(createAdminDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
