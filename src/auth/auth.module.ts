import { AuthMutationResolver } from './resolvers/auth.mutation.resolver';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport/dist';
import { LocalStrategy } from './strategies/local.strategy';


@Module({
  imports: [UserModule,PassportModule],
  providers: [AuthService, AuthMutationResolver, LocalStrategy],
})
export class AuthModule {}
