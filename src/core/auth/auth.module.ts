import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { secretKey } from "../../settings"
@Module({
  imports:[TypeOrmModule.forFeature([UserEntity]),
  PassportModule,
  JwtModule.register({
    secret: secretKey,
    signOptions: { expiresIn: '1d' },
  }),],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
