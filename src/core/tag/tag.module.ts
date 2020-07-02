/*
 * @Author: josh119891
 * @Date: 2020-06-27 13:25:19
 * @LastEditTime: 2020-07-02 22:17:28
 * @Description: 
 */ 
import { Module } from '@nestjs/common/decorators';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  TagEntity } from 'src/entities';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';



@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  providers: [TagService],
  controllers: [TagController]
})
export class TagModule {}
