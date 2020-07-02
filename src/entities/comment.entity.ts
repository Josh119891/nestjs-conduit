/*
 * @Author: josh119891
 * @Date: 2020-06-14 16:50:56
 * @LastEditTime: 2020-06-21 10:53:53
 * @Description: 
 */ 
import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { UserEntity } from "./user.entity";
import { userInfo } from "os";
import { ArticleEntity } from "./article.entity";
import { classToPlain } from "class-transformer";

@Entity('comment')
export class CommentEntity extends AbstractEntity{
   @Column()
   body:string;


   @ManyToOne(type=>UserEntity, user=>user.comments,{eager:true})
   author: UserEntity;


   @ManyToOne(type =>ArticleEntity, article=>article.comments)
   article:ArticleEntity[]

   toJSON(){
     return classToPlain(this);
   }
}
