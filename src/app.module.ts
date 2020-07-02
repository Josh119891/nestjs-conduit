import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './core/user/user.module';
import { TypeormOptions } from './settings';
import { ArticleModule } from './core/article/article.module';
import { TagModule } from './core/tag/tag.module';



@Module({
  imports: [ TypeOrmModule.forRootAsync({
    useClass: TypeormOptions
  }),UserModule, ArticleModule,TagModule],
})
export class AppModule {}
