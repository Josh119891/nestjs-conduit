import { Controller, Body, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO, LoginDTO } from 'src/models/user.model';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

@Controller('users')
export class AuthController {
  constructor(private readonly authService:AuthService) {} 

  @Post('register')
  @ApiProperty()
  async register(@Body('user') registerDTO:RegisterDTO){
    const user= await this.authService.register(registerDTO);
    return {user};
  }
  @Post('login')
  async login(@Body('user') loginDTO:LoginDTO){
    const user= await this.authService.login(loginDTO);
    return {user};
  }
}
