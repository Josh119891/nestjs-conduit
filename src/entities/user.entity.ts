import { Column, BeforeInsert, Entity, JoinTable, ManyToMany, OneToMany, JoinColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Exclude, classToPlain } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { AbstractEntity } from "./abstract.entity";
import { ArticleEntity } from "./article.entity";

@Entity('user')
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

  @ManyToMany(type=>UserEntity,user=>user.followee)
  @JoinTable()
  follower:UserEntity[];

  @ManyToMany(type=>UserEntity,user=>user.follower)
  @JoinTable()
  followee:UserEntity[];

  @OneToMany(type=>ArticleEntity,
    article=>article.author)
  articles:  ArticleEntity[]
  
  @ManyToMany(type=>ArticleEntity,article=>article.favoritedBy)
  @JoinColumn()
  favorites:ArticleEntity[]
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

  toProfile(user:UserEntity){
    const following = this.follower.includes(user);
    const profile:any = this.toJSON();
    console.log(profile)
    delete profile.follower;
    return {...profile,following};
  }
}