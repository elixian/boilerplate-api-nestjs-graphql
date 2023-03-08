import { AuthService } from './../auth.service';
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local.auth.guard';
import { AuthLoginOutPut } from '../dto/auth.login.dto';

@Resolver()
export class AuthMutationResolver{
  /**
   *
   */
  constructor(private readonly authService : AuthService) {}


  @UseGuards(LocalAuthGuard)
  @Mutation(()=> AuthLoginOutPut)
  async authLogin(
    @Context('req') req,
    @Args('email') _email: string,
    @Args('password') _password:string
  ){
    return this.authService.login(req.user)

  }
}
