

import { Entity, Column, BeforeInsert, ManyToOne, JoinColumn, ManyToMany, RelationCount, JoinTable, OneToMany }from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import * as slugify from "slug"
import { UserEntity } from "./user.entity";
import { classToPlain } from "class-transformer";
import { CommentEntity } from "./comment.entity";
@Entity("article")
export class ArticleEntity extends AbstractEntity{
  @Column()
  slug:string;

  @Column()
  title:string;

  @Column()
  description:string;

  @ManyToOne(type=> UserEntity,
    user => user.articles,
    {eager:true})
  author:UserEntity;

  @ManyToMany(
    type=>UserEntity,
    user=>user.favorites,
    {eager:true}
  )
  @JoinTable()
  favoritedBy: UserEntity[];

  @RelationCount((article: ArticleEntity)=>article.favoritedBy)
  favoritesCount:number;

  @Column('simple-array')
  tagList:string[];

  @OneToMany(type=>CommentEntity,comment=>comment.article)
  comments:CommentEntity[]
  
  @BeforeInsert()
  generateSlug(){
    this.slug = slugify(this.title,{lower:true})+ '-'+(Math.random() * Math.pow(36,6)|0).toString(36)
  }

  toJSON(){
    return classToPlain(this);
  }
  toArticle(user:UserEntity){
    let favorited=null;
    if(user&& this.favoritedBy){
      favorited = this.favoritedBy.map(user=> user.id).includes(user.id);
    }
    const article:any = this.toJSON();
    delete article.favoritedBy;
    return  {...article,favorited}
  }
}