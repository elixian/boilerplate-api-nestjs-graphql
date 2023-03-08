import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}


@ObjectType()
export class CreateUserOutput {
  @Field()
  name: string;

  @Field()
  email: string;
}
