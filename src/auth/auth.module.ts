import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminModule } from '../admin/admin.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    AdminModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    })
  ],
  providers: [AuthService,JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {
}
