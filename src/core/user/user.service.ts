import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse, UpdateDTO, RegisterDTO, LoginDTO } from 'src/models';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  private readonly jwtService: JwtService,){}
   
  async findByUsername(username: string):Promise<AuthResponse>{
    const user = await this.userRepo.findOne({username});
    return this.authResposne(user);
  }

  async update(username:string,updateDTO:UpdateDTO):Promise<AuthResponse>{
    await this.userRepo.update({username},updateDTO);
    return await this.findByUsername(username);
  }


  async register({username,password,email}:RegisterDTO):Promise<AuthResponse>{
    const isExisted= await this.userRepo.findOne({where:[{username},{email}]});
    if(isExisted){
        throw new ConflictException('user existed');
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
    const token = this.jwtService.sign({username:user.username});
    return { ...user.toJSON(), token };
  }
  
}
