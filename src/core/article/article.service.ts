import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity, UserEntity } from 'src/entities';
import { ArticleCreateDTO, ArticleUpdateDTO } from 'src/models/article.model';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity) private articleRepo: Repository<ArticleEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ){}
  async findBySlug(slug:string){
    return await this.articleRepo.findOne({where:{slug}});
  }

  async createArticle(user:UserEntity, data:ArticleCreateDTO){
    const article = this.articleRepo.create(data);
    article.author = user;
    await article.save();
    return article;
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
}
