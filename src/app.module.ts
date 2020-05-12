import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './core/user/user.module';
import { TypeormOptions } from './settings';


@Module({
  imports: [ TypeOrmModule.forRootAsync({
    useClass: TypeormOptions
  }), UserModule,],
})
export class AppModule {}
