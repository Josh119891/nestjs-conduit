import { Controller, Get, UseGuards, Param, Post, Delete, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { JWTGuard, User } from 'src/settings';
import { UserEntity } from 'src/entities';
import { Profile } from 'src/models';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly userService:UserService) {} 

  @Get('/:username')
  @UseGuards(JWTGuard)
  async getProfile(@User() currentUser:UserEntity,@Param('username') username:string){
    const profile =await this.userService.getProfile(currentUser,username);
    return {profile};
  }

  @Post('/:username/follow')
  @UseGuards(JWTGuard)
  @HttpCode(200)
  async follow(@User() currentUser:UserEntity, @Param('username') username: string){
    const profile = await this.userService.followUser(currentUser,username);
    return {profile};
  }

  @Delete('/:username/follow')
  @UseGuards(JWTGuard)
  async unfollow(@User() currentUser:UserEntity, @Param('username') username: string){
    const profile = await this.userService.unfollowUser(currentUser,username);
    return {profile};
  }
}
