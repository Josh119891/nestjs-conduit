import { Controller, Body, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDTO, LoginDTO } from 'src/models/user.model';

@Controller('users')
export class AuthController {
  constructor(private readonly userService:UserService) {} 
  @Post('register')
  async register(@Body('user') registerDTO:RegisterDTO){
    const user= await this.userService.register(registerDTO);
    return {user};
  }

  @Post('login')
  async login(@Body('user') loginDTO:LoginDTO){
    const user= await this.userService.login(loginDTO);
    return {user};
  }
}
