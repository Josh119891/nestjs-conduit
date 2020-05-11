import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeormOptions implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "123456",
      database: "realworld",
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true,
      logging: ["error","warn"],
      entities: ["dist/**/*.entity.js"]
    };
  }
}