import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthMutationResolver } from './resolvers/auth.mutation.resolver';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport/dist';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [UserModule,PassportModule,ConfigModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService :ConfigService)=>({
        secret: configService.get('JWT_SECRET'),
        signOptions:{expiresIn: configService.get('JWT_EXPIRE_TIME')}
      })
    })
  ],
  providers: [AuthService, AuthMutationResolver, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
