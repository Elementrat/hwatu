'use client';

import { useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import FlashCard from '#/types/FlashCard';
import { nameAtom, countAtom } from '#/app/store/debug';

const AtomDebugger = ({ cards }: { cards: FlashCard[] }) => {
  useHydrateAtoms(new Map([[countAtom, cards.length]]));

  const [count] = useAtom(countAtom);
  const [name, setName] = useAtom(nameAtom);

  return (
    <div className="justify-content-center absolute top-0 right-0 flex items-center overflow-hidden rounded-b-lg bg-gray-800 p-2">
      <div className="test">SSR Cards: {count}</div>
      <input
        type="text bg-black p-4"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <div className="bg-orange">{name}</div>
    </div>
  );
};

export default AtomDebugger;
