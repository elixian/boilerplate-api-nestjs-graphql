import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  Name: string;

  @Field()
  Email: string;

  @Field()
  Password: string;
}


@ObjectType()
export class CreateUserOutput {
  @Field()
  Name: string;

  @Field()
  Email: string;
}
