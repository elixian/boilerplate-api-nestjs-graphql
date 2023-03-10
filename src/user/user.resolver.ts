import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context, ID } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { UserEntity } from 'src/user/models/user.model';
import { CreateUserInput, CreateUserOutput } from './dto/createUser';
import { findAllResponseDTO, FindAllUserData } from './dto/findAllResponseDTO';
import { JWTMiddlewareDTO } from './dto/middle-ware';
import { Token } from './dto/token';
import { UserService } from './user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // user register functionality
  @Mutation(() => CreateUserOutput)
  createUser(
    @Args('UserCreateObject') userCreateObject: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.userService.createUser(userCreateObject);
  }

  // user login functionality
  @Query(() => Token)
  userLogin(
    @Args('Email') Email: string,
    @Args('Password') Password: string,
  ): Promise<{ Token: string }> {
    return this.userService.userLogin(Email, Password);
  }

  // @UseGuards(new JWTMiddleware())
  // @Query(() => findAllResponseDTO)
  // async findAllUserData(@Context('user') user: JWTMiddlewareDTO): Promise<{
  //   CurrentUser: JWTMiddlewareDTO;
  //   AllUserData: FindAllUserData[];
  // }> {
  //   const data = {
  //     CurrentUser: user,
  //     AllUserData: await this.userService.findAllUserData(user.ID),
  //   };
  //   return data;
  // }

  @Query(() => findAllResponseDTO)
  @UseGuards(JwtAuthGuard)
  async findAllUserData(
    @Context() context
  ): Promise<{
    AllUserData: FindAllUserData[];
  }> {
    console.log("🚀 ~ file: user.service.ts:81 ~ UserService ~ context:", context.ID)
    const data = {
      AllUserData: await this.userService.findAllUserData(),
    };

    return data;
  }

}
