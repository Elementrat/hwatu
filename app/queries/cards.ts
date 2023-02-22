import graphql from 'graphql-tag';

export const QUERY_KEYS = {
  MY_CARDS: 'my-cards',
  NEW_PUBLISHED_CARD: 'new-published-card',
};

export const USER_IDS = {
  SYSTEM: 'SYSTEM',
};

const createCardQuery = graphql(/* GraphQL */ `
  mutation CreateCard($front: String, $back: String, $creatorID: String) {
    insertCard(front: $front, back: $back, creatorID: $creatorID) {
      front
      back
      creatorID
    }
  }
`);

const deleteCardQuery = graphql(/* GraphQL */ `
  mutation DeleteCard($_id: String) {
    deleteCard(_id: $_id) {
      _id
    }
  }
`);

const userCardsQuery = graphql(/* GraphQL */ `
  query MyCards($creatorID: String) {
    cards(creatorID: $creatorID) {
      creatorID
      front
      back
      _id
    }
  }
`);

export { createCardQuery, userCardsQuery, deleteCardQuery };
