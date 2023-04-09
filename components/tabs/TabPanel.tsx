import { HTMLMotionProps, motion } from 'framer-motion';
import { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

type TabPanelProps = {
  children?: ReactElement;
  className?: string;
  enableAnim?: boolean;
  animVariables?: HTMLMotionProps<'div'>;
};
const defaultAnimVariables = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { type: 'ease', duration: 0.3 },
};
function TabPanel({ children, className, enableAnim, animVariables = defaultAnimVariables }: TabPanelProps) {
  const _animVariables = enableAnim ? animVariables : {};
  return (
    <motion.div {..._animVariables} className={twMerge('flex-grow', className)}>
      {children}
    </motion.div>
  );
}
export default TabPanel;
