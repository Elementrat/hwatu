import { atom } from 'jotai';

const nameAtom = atom<string>('');
const countAtom = atom(0);

export { nameAtom, countAtom };
