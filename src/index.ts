import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { AuthorResolver } from './resolvers/AuthorResolver';
import { BookResolver } from './resolvers/BookResolver';

(async () => {
  const app = express();

  const options = await getConnectionOptions();
  await createConnection({ ...options, name: 'default' });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthorResolver, BookResolver],
      validate: true,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    global.console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
