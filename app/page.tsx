import NewFlashCard from '#/ui/NewFlashCard';
import { getAllCards } from '#/lib/server/cards';
import AtomDebugger from '#/ui/AtomDebugger';

export default async function Page() {
  const cards = await getAllCards();

  return (
    <div className="justify-top mx-auto flex h-screen flex-col space-y-8 px-2 pt-20 lg:py-8 lg:px-8">
      <NewFlashCard />
    </div>
  );
}
