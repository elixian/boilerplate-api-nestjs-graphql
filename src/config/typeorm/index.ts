import { ConfigService } from '@nestjs/config';
import { Inject, Injectable, Module } from '@nestjs/common'
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'



@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory  {
    // readonly config: ConfigService = new ConfigService();
    constructor( private readonly config: ConfigService) {}
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
          type: 'postgres',
          host: process.env.NODE_ENV === 'production'? "postgres" : this.config.get('DB_HOST'),
          port: this.config.get('DB_PORT'),
          username: this.config.get('DB_USERNAME'),
          password: this.config.get('DB_PASSWORD'),
          database: this.config.get('DB_DATABASE'),
          entities: [__dirname + '/../**/*.model{.ts,.js}'],
          autoLoadEntities: true,
        //   logging: true,
          synchronize: true,
        };
      }

}

