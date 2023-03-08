import { Field, Int, ObjectType, ID } from '@nestjs/graphql';
import { JWTMiddlewareDTO } from './middle-ware';

@ObjectType()
export class FindAllUserData {
  @Field(() => ID)
  ID: number;

  @Field()
  name: string;

  @Field()
  email: string;
}

@ObjectType()
export class findAllResponseDTO {
  @Field(() => [FindAllUserData])
  AllUserData: FindAllUserData[];

  @Field(() => JWTMiddlewareDTO)
  CurrentUser: JWTMiddlewareDTO;
}
