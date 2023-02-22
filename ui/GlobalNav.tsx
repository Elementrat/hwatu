'use client';

import { NextLogo } from '#/ui/NextLogo';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { MenuAlt2Icon, XIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { Suspense, useState } from 'react';
import FlashCard from '#/types/FlashCard';
import { countAtom } from '#/app/store/debug';
import { useAtom } from 'jotai';
import CardCollection from './nav/CardCollection';
import LoadingDots from './LoadingDots';

export const GlobalNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const [cardCount] = useAtom(countAtom);

  return (
    <div className="fixed top-0 z-10 flex w-full flex-col bg-neutral-900 lg:bottom-0 lg:z-auto lg:w-72">
      <div className="flex h-14 items-center  px-4 lg:h-auto">
        <Link
          href="/"
          className="group flex w-full items-center gap-x-2.5"
          onClick={close}
        ></Link>
      </div>
      <button
        type="button"
        className="group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-medium text-gray-100 group-hover:text-primary-400">
          Menu
        </div>
        {isOpen ? (
          <XIcon className="block w-6 text-gray-400" />
        ) : (
          <MenuAlt2Icon className="block w-6 text-gray-400" />
        )}
      </button>

      <div
        className={clsx('overflow-y-auto lg:static lg:block', {
          'fixed inset-x-0 bottom-0 top-14 mt-px bg-black': isOpen,
          hidden: !isOpen,
        })}
      >
        <nav className="space-y-6 px-2 py-5">
          <Suspense fallback={<LoadingDots />}>
            <CardCollection />
          </Suspense>
        </nav>
      </div>
    </div>
  );
};
