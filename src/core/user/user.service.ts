import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse, UpdateDTO } from 'src/models';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  private readonly jwtService: JwtService,){}
   
  async findByUsername(username: string):Promise<AuthResponse>{
    const user = await this.userRepo.findOne(username);
    return this.authResposne(user);
  }
  async update(username:string,updateDTO:UpdateDTO):Promise<AuthResponse>{
    console.log(username)
    await this.userRepo.update({username},updateDTO);
    const user= await this.findByUsername(username);
    console.log(user);
    return user
  }


  authResposne(user: any):AuthResponse{
    const {username}=user;
    const token = this.jwtService.sign({username});
    return { ...user.toJSON(), token };
  }
  
}
