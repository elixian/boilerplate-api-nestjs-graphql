import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/models/user.model';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLConfig } from 'src/config/graphql.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserService, UserResolver],
})
export class UserModule {}
