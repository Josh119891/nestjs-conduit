import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { JWTGuard, User } from 'src/settings';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly userService:UserService) {} 

  @Get('/:username')
  async getProfile(@Param('username') username:string){
    const profile =await this.userService.findByUsername(username);
    Object.assign(profile, {following:false});
    return {profile};
  }
}
