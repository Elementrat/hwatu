import gql from 'graphql-tag';

const typeDefs = gql`
  type Card {
    _id: String
    front: String
    back: String
    creatorID: String
  }

  type User {
    _id: String
    username: String
  }

  type Query {
    hello: String
    cards(creatorID: String): [Card]
  }

  type Mutation {
    insertCard(front: String, back: String, creatorID: String): Card
  }

  type Mutation {
    deleteCard(_id: String): [Card]
  }
`;

export default typeDefs;
