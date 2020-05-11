import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from "class-transformer";


export class AbstractEntity extends BaseEntity{
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
  
}