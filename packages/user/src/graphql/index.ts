import path from "path";
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { resolvers } from "./resolvers";

const rawSchema = loadSchemaSync(
  path.resolve(__dirname, "..", "..", "schema.graphql"),
  { loaders: [new GraphQLFileLoader()] }
);

export const schema = addResolversToSchema({
  schema: rawSchema,
  resolvers,
})