/*
 * @Author: josh119891
 * @Date: 2020-06-07 16:32:24
 * @LastEditTime: 2020-06-14 12:57:02
 * @Description: 
 */ 

 export class ArticleCreateDTO{
   title:string;
   body:string;
   description: string;
   tagList: string[]
 }

 export class ArticleUpdateDTO{
  title:string;
  body:string;
  description: string;
  tagList: string[]
 }


 export interface FindAllQuery extends FindFeedQuery{
   tag?:string;
   author?:string;
   favorited?:string;
 }
 
 export interface FindFeedQuery{
  limit?:number;
  offset?:number;
 }
