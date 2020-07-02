/*
 * @Author: josh119891
 * @Date: 2020-06-27 13:18:31
 * @LastEditTime: 2020-07-02 22:16:03
 * @Description: 
 */ 
import { Controller, Get, Param, UseGuards, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { JWTGuard, User } from 'src/settings';

@Controller('tags')
export class TagController {
  constructor(private tagService: TagService){}

  @Get('')
  async getList(){
    const tags = await this.tagService.findTags();
    return {tags};
  }
}