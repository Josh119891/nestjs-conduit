import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDTO, LoginDTO, AuthResponse } from 'src/models/';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  private readonly jwtService: JwtService,
  ){}

  async register({username,password,email}:RegisterDTO):Promise<AuthResponse>{
      const isExisted= await this.userRepo.findOne({where:[{username},{email}]});
      if(isExisted){
          throw new ConflictException('userexisted');
      }
      const  user = this.userRepo.create({username,password,email});
      await user.save();
      return this.authResposne(user) ;
  }

  async login({password,email}:LoginDTO):Promise<AuthResponse>{
    const user = await this.userRepo.findOne({email});
    if(user && await user.comparePassword(password)){
      return this.authResposne(user)
    } 
    throw new UnauthorizedException('Invalid credentials');
  }

  authResposne(user: any):AuthResponse{
    const {username}=user;
    const token = this.jwtService.sign({username});
    return { ...user.toJSON(), token };
  }
  
}
