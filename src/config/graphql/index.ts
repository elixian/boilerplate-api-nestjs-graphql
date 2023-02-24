import { ApolloDriver, } from "@nestjs/apollo";
import { GqlModuleOptions } from "@nestjs/graphql";




export const GraphQLConfigService: GqlModuleOptions = {

  driver: ApolloDriver,
  autoSchemaFile: 'schema.gql',

}

