/*
 * @Author: josh119891
 * @Date: 2020-06-21 11:43:31
 * @LastEditTime: 2020-06-21 11:44:58
 * @Description:  
 */

 import { Column, Entity } from "typeorm";
 import { AbstractEntity } from './abstract.entity';

 @Entity('tags')
 export class TagEntity extends AbstractEntity{
   @Column()
   tag:string;

   toJSON(){
     return this.tag;
   }
 }
 
