import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { ArticleEntity, UserEntity } from 'src/entities';
import { ArticleCreateDTO, ArticleUpdateDTO, FindAllQuery, FindFeedQuery } from 'src/models/article.model';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity) private articleRepo: Repository<ArticleEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ){}


  async findAll(user:UserEntity, query:FindAllQuery){
    const findOptions = {where:{}};
    if(query.author){
      findOptions.where['author.username']=query.author
    }
    if(query.favorited){
      findOptions.where['favoritedBy.username']=query.favorited;
    }
    if(query.tag){
      findOptions.where['tagList']=Like(`%${query.tag}%`)
    }
    if(query.offset){
      findOptions["offset"] = query.offset;
    }
    if(query.limit){
      findOptions["limit"]=query.offset;
    }
    return (await this.articleRepo.find(findOptions)).map((article)=> article.toArticle(user));
  }

  async  findFeed(user:UserEntity, query:FindFeedQuery){
    const {followee} = await this.userRepo.findOne({where:{id:user.id},relations:['followee']})

    const findOptions = {...query,where:followee.map(follow=>({authrow:follow.id})   )};
    return (await this.articleRepo.find(findOptions)).map((article)=> article.toArticle(user));
  }
  async findBySlug(slug:string){
    return await this.articleRepo.findOne({where:{slug}});
  }

  async createArticle(user:UserEntity, data:ArticleCreateDTO){
    const article = this.articleRepo.create(data);
    article.author = user;
    const {slug}= await article.save();
    return (await this.articleRepo.findOne(slug)).toArticle(user);
  }

  async updateArticle(slug:string, user:UserEntity, data:ArticleUpdateDTO){
    const article = await this.findBySlug(slug);
    if(!this.ensureOwnerShip(user,article)){
      throw new UnauthorizedException();
    }
    await this.articleRepo.update({slug},data);
    return article;
  }

  async deleteArticle(slug:string, user:UserEntity){
    const article = await this.findBySlug(slug);
    if(!this.ensureOwnerShip(user,article)){
      throw new UnauthorizedException();
    }
    await this.articleRepo.remove(article)
  }
  private ensureOwnerShip(user:UserEntity,article:ArticleEntity): boolean{
    return article.author.id === user.id;
  }

  async favoriteArticle(slug:string,user:UserEntity){
    const article = await this.findBySlug(slug);
    article.favoritedBy.push(user);
    await user.save()
    return (await this.findBySlug(slug)).toArticle(user);
  }
  async unFavoriteArticle(slug:string,user:UserEntity){
    const article = await this.findBySlug(slug);
    article.favoritedBy.filter((fav)=>  fav.id!==user.id)
    await user.save()
    return (await this.findBySlug(slug)).toArticle(user);
  }
}
