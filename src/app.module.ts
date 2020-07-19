import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './admin/admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin/admin.entity';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { Menu } from './menu/menu.entity';
import { MenuController } from './menu/menu.controller';
import { MenuService } from './menu/menu.service';
import { MenuModule } from './menu/menu.module';
import { Article } from './article/article.entity';
import { ArticleController } from './article/article.controller';
import { ArticleService } from './article/article.service';
import { ArticleModule } from './article/article.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root123456',
      database: 'blog-admin',
      entities: [
        Admin,
        Menu,
        Article
      ],
      synchronize: true,
    }),
    AdminModule,
    AuthModule,
    MenuModule,
    ArticleModule,
  ],
  controllers: [
    AppController,
    AdminController,
    MenuController,
    ArticleController
  ],
  providers: [
    AppService,
    AdminService,
    MenuService,
    ArticleService
  ],
})
export class AppModule {
}
