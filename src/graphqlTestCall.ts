import { graphql } from "graphql";
import { buildSchema } from "type-graphql";

import { BookResolver } from "./resolvers/BookResolver";
import { AuthorResolver } from "./resolvers/AuthorResolver";

export const graphqlTestCall = async (
  query: any,
  variables?: any
) => {
  const schema = await buildSchema({
    resolvers: [BookResolver, AuthorResolver],

    emitSchemaFile: true,

  });
  return graphql(
    schema,
    query,
    undefined,
    undefined,
    variables
  );
};