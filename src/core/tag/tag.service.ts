/*
 * @Author: josh119891
 * @Date: 2020-06-27 13:25:25
 * @LastEditTime: 2020-07-02 21:51:32
 * @Description: 
 */ 
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {  TagEntity } from 'src/entities';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity) private tagRepo: Repository<TagEntity>
  ){}

 

  async findTags(): Promise<string[]> {
    const tags = await this.tagRepo.find();
    return tags.map(tag => tag.tag);
  }



}
