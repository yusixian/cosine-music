import clsx from 'clsx';
export function Footer({ className }: { className?: string }) {
  return (
    <footer className={clsx('flex items-center justify-center gap-2 py-4 text-xl', className)}>
      Powered by{' '}
      <a className="text-blue-400" href="https://github.com/yusixian">
        cosine
      </a>
    </footer>
  );
}
