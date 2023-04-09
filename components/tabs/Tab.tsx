import clsx from 'clsx';
import { HTMLMotionProps, motion } from 'framer-motion';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type TabProps = {
  className?: string;
  indicatorProps?: HTMLMotionProps<'i'>;
  indicatorClass?: string;
  children?: ReactNode;
  onClick?: () => void;

  /** Private */
  id?: string;
  selected?: boolean;
};
function Tab({ children, className, indicatorProps, indicatorClass, id, selected, onClick }: TabProps) {
  return (
    <motion.div
      className={clsx(
        { 'text-primary': selected },
        twMerge('relative flex cursor-pointer items-center justify-center text-xl hover:opacity-70', className),
      )}
      onClick={onClick}
    >
      {children}
      {selected && (
        <motion.i
          layoutId={`tab-indicator-${id ?? 'default'}`}
          {...indicatorProps}
          className={twMerge('absolute inset-x-0 -bottom-1 block border-t-2 border-primary', indicatorClass)}
        />
      )}
    </motion.div>
  );
}
export default Tab;
