import { Column, BeforeInsert, Entity } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Exclude, classToPlain } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { AbstractEntity } from "./abstract.entity";

@Entity('User')
export class UserEntity extends AbstractEntity{

  @Column({type:"text", unique: true })
  @IsEmail()
  email: string;

  @Column({type:"text", unique: true })
  username: string;

  @Column({ default: '',type:"text" })
  bio: string;

  @Column({ default: '',type:"text"  })
  image: string ;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  toJSON() {
    return classToPlain(this);
  }

}