/*
 * @Author: josh119891
 * @Date: 2020-06-07 16:32:24
 * @LastEditTime: 2020-06-07 17:40:04
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