import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity, UserEntity } from 'src/entities';
import { CommentService } from './comment.service';
import { CommentEntity } from 'src/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity,UserEntity,CommentEntity])],
  providers: [ArticleService, CommentService],
  controllers: [ArticleController]
})
export class ArticleModule {}
