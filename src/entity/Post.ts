import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne
} from "typeorm";

import { Users } from './Users'

@Entity()
export class Post {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100
  })
  title: string;

  @Column({
    type: "text"  
  })
  markdown: string;

  @ManyToOne(type => Users, user => user.posts)
  user: Users;

}
