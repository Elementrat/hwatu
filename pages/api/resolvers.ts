import FlashCard from '#/types/FlashCard';
import { getAllCards, createCard, deleteCard } from '#/lib/server/cards';

const resolvers = {
  Query: {
    hello: () => 'world!?!!',
    cards: async (parent: any, args: any, contextValue: any, info: any) => {
      const cards = await getAllCards();
      if (args.creatorID) {
        const results =
          cards.filter(
            (card: FlashCard) =>
              String(card.creatorID) === String(args.creatorID),
          ) || [];
        return results;
      }
      return cards;
    },
  },
  Mutation: {
    insertCard: async (parent: any, args: any, context: any, info: any) => {
      const { front, back, creatorID } = args;
      const newFlashCardData: FlashCard = { front, back, creatorID };
      const newFlashCard = await createCard(newFlashCardData);
      return newFlashCard;
    },
    deleteCard: async (parent: any, args: any, context: any, info: any) => {
      const { _id } = args;
      const deleteCardResult = await deleteCard({ _id });
      return;
    },
  },
};

export default resolvers;
