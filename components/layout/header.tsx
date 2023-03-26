import { useRouter } from 'next/router';
import { FcMusic } from 'react-icons/fc';
import { Navigator } from '../ui/Navigator';

export function Header() {
  const router = useRouter();
  return (
    <header className="flex min-h-[4.5rem] w-full items-center justify-between gap-4 px-4 py-2">
      <div
        className="flex cursor-pointer items-center justify-center whitespace-nowrap text-2xl font-bold"
        onClick={() => router.push('/')}
      >
        <FcMusic className="h-9 w-9" />
        Cosine Music
      </div>
      <Navigator className="h-full flex-grow" />
    </header>
  );
}
