import { Field, ID, Int, ObjectType, Resolver } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity("User")
@Resolver()
@ObjectType()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  ID: number;

  @CreateDateColumn()
  @Field(() => Date)
  dateCreated: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  dateUpdated: Date;

  @Column({ comment: 'User email address', nullable: false })
  @Field()
  name: string;

  @Column({ comment: 'User email address', unique: true, nullable: false })
  @Field()
  email: string;

  @Column({ comment: 'User email address', type: 'text', nullable: false })
  @Field()
  password: string;
}
