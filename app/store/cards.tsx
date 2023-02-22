import { atomsWithQuery } from 'jotai-tanstack-query';
import { request } from 'graphql-request';

import { atomsWithMutation } from 'jotai-tanstack-query';
import { API_URLS } from '#/lib/constants';
import {
  createCardQuery,
  deleteCardQuery,
  userCardsQuery,
} from '../queries/cards';
import { USER_IDS } from '../queries/cards';
import { QUERY_KEYS } from '../queries/cards';
import FlashCard from '#/types/FlashCard';
import { atom } from 'jotai';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const newUnpublishedCardAtom = atom<FlashCard>({
  front: '',
  back: '',
  creatorID: USER_IDS.SYSTEM,
});

const [myCardsAtom] = atomsWithQuery((get) => {
  return {
    queryKey: [QUERY_KEYS.MY_CARDS],
    queryFn: async () => {
      const result = await request(API_URLS.GQL, userCardsQuery, {
        creatorID: USER_IDS.SYSTEM,
      });
      return result?.cards;
    },
  };
});

const [, newPublishedCardAtom] = atomsWithMutation((get) => ({
  mutationKey: [QUERY_KEYS.NEW_PUBLISHED_CARD],
  mutationFn: async ({
    front,
    back,
    creatorID,
  }: {
    front: string;
    back: string;
    creatorID: string;
  }) => {
    const result = await request(API_URLS.GQL, createCardQuery, {
      front,
      back,
      creatorID,
    });
    const createdCardResult = result?.insertCard;
    return createdCardResult;
  },
}));

const usePublishCardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (cardDetails: FlashCard) => {
      const result = await request(API_URLS.GQL, createCardQuery, {
        ...cardDetails,
      });
      const createdCardResult = result?.insertCard;
      return createdCardResult;
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries([QUERY_KEYS.MY_CARDS]);
      },
    },
  );
};

const useDeleteCardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ _id }: { _id: String }) => {
      const result = await request(API_URLS.GQL, deleteCardQuery, {
        _id,
      });
      const deletedCardResult = result?.deleteCard;
      return deletedCardResult;
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries([QUERY_KEYS.MY_CARDS]);
      },
    },
  );
};

export {
  myCardsAtom,
  newPublishedCardAtom,
  newUnpublishedCardAtom,
  usePublishCardMutation,
  useDeleteCardMutation,
};
