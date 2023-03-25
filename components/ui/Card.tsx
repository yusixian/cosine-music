import clsx from 'clsx';
import { motion } from 'framer-motion';
import { MouseEventHandler, ReactNode, useCallback } from 'react';
import { useMountedState } from 'react-use';

type CardProps = {
  title?: string;
  desc?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  href?: string;
  clickable?: boolean;

  className?: string;
};
const Card = ({ title, desc, children, onClick, href, className, clickable = false }: CardProps) => {
  const _clickable = clickable ?? (href || onClick);
  const _onClick: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    href && window?.open(href, '_blank');
    onClick?.(e);
  }, []);

  return (
    <div
      onClick={_onClick}
      className={clsx(
        'flex flex-col gap-3 rounded-xl border border-black/20 p-4 dark:border-white/20 dark:bg-white/10',
        { 'cursor-pointer transition-all duration-300 hover:-translate-y-2': _clickable },
        className,
      )}
    >
      {title && <h2 className="text-xl font-bold">{title}</h2>}
      {desc && <p className="text-sm">{desc}</p>}
      {children}
    </div>
  );
};
export default Card;
