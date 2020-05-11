import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { JwtStrategy } from 'src/settings/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { secretKey } from 'src/settings';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity]),
  PassportModule,
  JwtModule.register({
    secret: secretKey,
    signOptions: { expiresIn: '1d' },
  }),],
  controllers: [UserController],
  providers: [UserService,JwtStrategy]
})
export class UserModule {}
