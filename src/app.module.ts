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
import { ConfigModule } from '@nestjs/config';
import { Comment } from './comment/comment.entity';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { UserController } from './user/user.controller';
import { CommentController } from './comment/comment.controller';
import { UserService } from './user/user.service';
import { CommentService } from './comment/comment.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
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
        Article,
        Comment,
        User
      ],
      synchronize: true,
    }),
    AdminModule,
    AuthModule,
    MenuModule,
    ArticleModule,
    UserModule,
    CommentModule
  ],
  controllers: [
    AppController,
    AdminController,
    MenuController,
    ArticleController,
    UserController,
    CommentController
  ],
  providers: [
    AppService,
    AdminService,
    MenuService,
    ArticleService,
    UserService,
    CommentService
  ],
})
export class AppModule {
}
