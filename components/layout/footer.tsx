import { useGlobalPlayer } from '@/hooks/music';
import clsx from 'clsx';

export function Footer({ className }: { className?: string }) {
  const player = useGlobalPlayer();
  return <footer className={clsx('flex flex-col', className)}>{player}</footer>;
}
