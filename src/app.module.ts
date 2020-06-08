import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './core/user/user.module';
import { TypeormOptions } from './settings';
import { ArticleModule } from './core/article/article.module';


@Module({
  imports: [ TypeOrmModule.forRootAsync({
    useClass: TypeormOptions
  }), UserModule, ArticleModule,],
})
export class AppModule {}
