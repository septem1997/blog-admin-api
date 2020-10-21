import { Module } from '@nestjs/common';
import { TagModule } from './tag.module';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';

@Module({
  imports: [TagModule],
  providers: [TagService],
  controllers: [TagController]
})
export class TagHttpModule {}
