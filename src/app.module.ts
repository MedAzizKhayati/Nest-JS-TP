import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import { devConfig } from './config/dev.config';
import { prodConfig } from './config/prod.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CvModule } from './cv/cv.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [
    TodoModule,
    UsersModule,
    CvModule,
    SkillsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [process.env.NODE_ENV == 'development' ? devConfig : prodConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'gl3_tp_nestjs',
      autoLoadEntities: true,
      synchronize: true,
      log: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
