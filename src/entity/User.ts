import {
  Entity, PrimaryGeneratedColumn, Column,
  OneToMany
} from "typeorm";

import { Post } from './Post'

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  source: string;

  @OneToMany(type => Post, post => post.user)
  posts: Post[]; 

}
