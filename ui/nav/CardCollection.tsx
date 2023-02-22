'use client';

import { useAtom } from 'jotai';
import { myCardsAtom, useDeleteCardMutation } from '#/app/store/cards';
import FlashCard from '#/types/FlashCard';
import { TrashIcon } from '@heroicons/react/solid';

const CardCollection = () => {
  const [myCards] = useAtom(myCardsAtom);

  return (
    <div>
      <div className="px-4 py-2 text-lg">My Cards</div>
      <div>
        {myCards.map((card: FlashCard) => {
          return <Card card={card} key={String(card._id)} />;
        })}
      </div>
    </div>
  );
};

const Card = ({ card }: { card: FlashCard }) => {
  const deleteCardMutation = useDeleteCardMutation();

  const tryDeleteCard = async () => {
    const result = await deleteCardMutation.mutateAsync({ _id: card._id });
  };

  return (
    <div className="group relative m-2 flex flex-col rounded-lg bg-primary-600 shadow-lg shadow-black/20">
      <div className="flex justify-between p-3">
        <div>{card.front}</div>
        <div className="mx-5 rounded-lg border-l-2 border-neutral-800/25 bg-gray-900/25"></div>
        <div>{card.back}</div>
      </div>
      <div
        className="cursor:pointer top-0 right-0 box-border flex h-0 overflow-hidden rounded-b-lg bg-gray-800 p-0 p-4 transition-all hover:border-2 group-hover:mt-1 group-hover:h-auto group-hover:p-4"
        onClick={tryDeleteCard}
      >
        <TrashIcon className="inline-block h-6 w-6" />
        <div className="ml-2">Delete</div>
      </div>
    </div>
  );
};

export default CardCollection;
