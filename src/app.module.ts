import { UserModule } from './user/user.module';
import {  ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';

import { Module } from '@nestjs/common';
import { TypeOrmModule, } from '@nestjs/typeorm';

import { TypeOrmService } from './config/typeorm/index';
import { GraphQLConfigService } from './config/graphql';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
     ...GraphQLConfigService,
     introspection: true,
      playground: true,
    }),
    // TypeOrmModule.forRoot({...PostgresDataSource, autoLoadEntities:true}), UserModule, AuthModule],
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmService,

    }),
    UserModule,
    AuthModule
  ],
  providers: [],
})
export class AppModule { }
