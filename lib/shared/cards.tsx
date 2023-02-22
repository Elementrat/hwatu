import gql from 'graphql-tag';
import fetchRequest from './request';

export const AllCardQuery = gql`
  query AllCardQuery {
    cards {
      _id
      front
    }
  }
`;

export const getAllCards = async () => {
  const data = await fetchRequest(`
    query AllCards{
      cards {
        _id
        front
      }
    }
  `);
  return data?.cards;
};
