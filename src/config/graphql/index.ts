import { GraphQLConfig } from 'src/config/graphql.config';
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GqlModuleAsyncOptions, GqlModuleOptions, GqlOptionsFactory } from "@nestjs/graphql";




export const GraphQLConfigService : GqlModuleOptions=  {
    
        driver: ApolloDriver,
        autoSchemaFile: 'schema.gql',
      
}

