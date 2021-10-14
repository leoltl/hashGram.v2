import path from "path";
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

export const schema = loadSchemaSync(
  path.resolve(__dirname, "..", "..", "schema.graphql"),
  { loaders: [new GraphQLFileLoader()] }
);

export * from "./resolvers";
