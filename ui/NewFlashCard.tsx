'use client';

import { useAtom } from 'jotai';

import TextInput from '#/ui/TextInput';
import {
  newUnpublishedCardAtom,
  usePublishCardMutation,
} from '#/app/store/cards';
import { useRef } from 'react';

const NewFlashCard = () => {
  const [newUnpublishedCard, setNewUnpublishedCard] = useAtom(
    newUnpublishedCardAtom,
  );

  const termRef = useRef<HTMLInputElement>(null);
  const definitionRef = useRef<HTMLInputElement>(null);

  const publishCardMutation = usePublishCardMutation();

  const updateFront = (e: any) => {
    setNewUnpublishedCard({
      ...newUnpublishedCard,
      front: e.target.value,
    });
  };

  const updateBack = (e: any) => {
    setNewUnpublishedCard({
      ...newUnpublishedCard,
      back: e.target.value,
    });
  };

  const tryCreateCard = async () => {
    if (newUnpublishedCard?.front && newUnpublishedCard?.back) {
      const result = await publishCardMutation.mutateAsync(newUnpublishedCard);
      if (result) {
        setNewUnpublishedCard({
          ...newUnpublishedCard,
          front: '',
          back: '',
        });
        console.log('__TERMREF', termRef);
        termRef.current?.focus();
      }
    }
  };

  const checkSubmit = async (e) => {
    console.log('__CHECK_SUBMIT', e);

    if (e.key === 'Enter') {
      tryCreateCard();
    }
  };

  return (
    <div>
      <div className="p-8 text-2xl uppercase opacity-20">Create New Card</div>
      <div className="overflow-hidden rounded-lg p-px shadow-lg shadow-black/20">
        <div className="rounded-lg-t bg-primary-600 p-3.5 lg:p-6 ">
          <div className="space-y-8">
            <div className="space-y-10 text-white">
              <div className="space-y-5">
                <div className="grid grid-cols-1 content-end gap-5 lg:grid-cols-2">
                  <div className="flex flex-col">
                    <TextInput
                      placeholder="Term"
                      value={newUnpublishedCard.front}
                      onChange={updateFront}
                      elementRef={termRef}
                    />
                  </div>
                  <div className="flex flex-col">
                    <TextInput
                      placeholder="Definition"
                      value={newUnpublishedCard.back}
                      onChange={updateBack}
                      onKeyDown={checkSubmit}
                      elementRef={definitionRef}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="group flex">
          <button
            className="border-box cursor-pointer p-3.5 hover:bg-primary-900 "
            onClick={tryCreateCard}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewFlashCard;
