import { Controller, Get, Param, UseGuards, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { JWTGuard, User } from 'src/settings';
import { UserEntity } from 'src/entities';
import { ArticleCreateDTO, ArticleUpdateDTO, FindAllQuery, FindFeedQuery } from 'src/models/article.model';
import { UpdateDTO } from 'src/models';
import { CommentService } from './comment.service';
import { CreateCommentDTO } from 'src/models/comment.model';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService,private commentService: CommentService){}

  @Get('/:slug')
  async findBySlug(@Param('slug') slug:string){
    const article = await this.articleService.findBySlug(slug);
    return {article}
  }
  @Get('/')
  async findAll(@User() user:UserEntity, @Query() query:FindAllQuery){
    const articles  =  await this.articleService.findAll(user,query);
    return {articles, articlesCount: articles.length}
  }

  @Get('/feed')
  @UseGuards(JWTGuard)
  async findFeed(@User() user:UserEntity, @Query() query:FindFeedQuery){
    const articles  =  await this.articleService.findFeed(user,query);
    return {articles, artilceCount: articles.length}
  }
  @Post('/:slug')
  @UseGuards(JWTGuard)
  async createArticle(@Param('slug') slug:string, @User() user: UserEntity, @Body('article') createDTO: ArticleCreateDTO){
    const article = await this.articleService.createArticle(user,createDTO);
    return {article:article.toArticle(user)};
  } 
  
  @Put('/:slug')
  @UseGuards(JWTGuard)
  async updateArticle(@Param('slug') slug:string,@User() user: UserEntity, @Body('article') updateDTO: ArticleUpdateDTO){
    const article = await this.articleService.updateArticle(slug,user,updateDTO);
    return {article};
  }

  @Delete('/:slug')
  @UseGuards(JWTGuard)
  async deleteArticle(@Param('slug') slug:string,@User() user: UserEntity){
    const article = await this.articleService.deleteArticle(slug,user);
    return {article};
  }

  @Post('/:slug/favorite')
  @UseGuards(JWTGuard)
  async favoriteArticle( @Param('slug') slug:string,@User() user:UserEntity){
    const article =  await this.articleService.favoriteArticle(slug,user);
    return {article}
  }



  @Delete('/:slug/favorite')
  @UseGuards(JWTGuard)
  async unFavoriteArticle(@Param('slug') slug:string,@User() user:UserEntity){
    const article =  await this.articleService.unFavoriteArticle(slug,user)
    return {article}

  }
  @Get('/:slug/comments')
  async findComments(@Param('slug') slug:string){
    const comments = await this.commentService.findByArticleSlug(slug);
    return {comments}
  }

  @Post('/:slug/comments')
  @UseGuards(JWTGuard)
  async createComment(@User() user:UserEntity,data:{comment:CreateCommentDTO}){
    const comment = await this.commentService.createComment(user,data.comment);
    return {comment};
  }

  @Delete('/:slug/comments/:id')
  @UseGuards(JWTGuard)
  async deleteComment(@User() user:UserEntity,@Param('id') id:number){
    const comment = await this.commentService.deleteComment(user,id);
    return {comment};
  }

}
