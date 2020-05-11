import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './core/user/user.module';
import { TypeormOptions } from './settings';
import { AuthModule } from './core/auth/auth.module';


@Module({
  imports: [ TypeOrmModule.forRootAsync({
    useClass: TypeormOptions
  }), UserModule, AuthModule,],
})
export class AppModule {}
