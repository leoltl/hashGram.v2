import path from "path";
import fs from "fs";
import { gql } from "apollo-server-core";
import { buildSubgraphSchema } from '@apollo/federation';
import { resolvers } from "./resolvers";

const typeDefsRaw = fs.readFileSync(
  path.resolve(__dirname, "..", "..", "schema.graphql")
);

export const schema = buildSubgraphSchema(
  { 
    typeDefs: gql`
      ${typeDefsRaw}
    `,
    resolvers: resolvers as any,
  }
);
