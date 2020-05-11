import { Controller, Get, UseGuards, Body, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User,JWTGuard } from 'src/settings';
import { UpdateDTO } from 'src/models';

@Controller('user')
export class UserController {
  constructor(private readonly userService:UserService) {} 
  
  @Get('/')
  @UseGuards(JWTGuard)
  async getCurrentUser(@User('username') username:string) {
      const user =await this.userService.findByUsername(username);
      return {user};
  }

  @Put('/')
  @UseGuards(JWTGuard)
  async updateUser(@User('username') username:string,@Body('user') updateDTO:UpdateDTO) {
    
      const user =await this.userService.update(username,updateDTO);
      return {user};
  }
}
