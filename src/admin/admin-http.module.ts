import { Module } from '@nestjs/common';
import { AdminModule } from './admin.module';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [AdminModule],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminHttpModule {}
