import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import typeDefs from './typedefs';
import resolvers from './resolvers';

const server = new ApolloServer({
  resolvers,
  typeDefs,
  csrfPrevention: false,
});

export default startServerAndCreateNextHandler(server);
