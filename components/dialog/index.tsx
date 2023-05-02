import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import React, { cloneElement, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { CgClose } from 'react-icons/cg';
import { AnimatePresence, motion } from 'framer-motion';

type DialogProps = {
  rootId?: string;
  open?: boolean;
  initialOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: JSX.Element;
  render: (props: { close: () => void }) => React.ReactNode;
  className?: string;
  overlayClass?: string;
  showCloseButton?: boolean;
  enableAnim?: boolean;
};

export default function Dialog({
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  children,
  className,
  render,
  rootId: customRootId,
  overlayClass,
  showCloseButton,
  enableAnim = true,
}: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const { reference, floating, context } = useFloating({
    open,
    onOpenChange: setOpen,
  });

  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });

  const { getReferenceProps, getFloatingProps } = useInteractions([click, role, dismiss]);

  const onClose = () => setOpen(false);

  const itemVariants = useMemo(() => {
    if (!enableAnim) return {};
    return {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 50 },
      transition: { type: 'spring', stiffness: 300, damping: 25 },
    };
  }, [enableAnim]);

  return (
    <>
      {children && cloneElement(children, getReferenceProps({ ref: reference, ...children.props }))}
      <FloatingPortal id={customRootId}>
        <AnimatePresence>
          {open && (
            <FloatingOverlay className={twMerge('z-20 grid place-items-center bg-black/60', overlayClass)} lockScroll>
              <FloatingFocusManager context={context}>
                <motion.div
                  {...itemVariants}
                  className={twMerge('relative min-w-[12.5rem] rounded bg-white p-4 shadow-md  dark:bg-[#383838]', className)}
                  ref={floating}
                  {...getFloatingProps()}
                >
                  {showCloseButton && <CgClose className="absolute right-4 top-4 cursor-pointer text-xl" onClick={onClose} />}
                  {render({ close: onClose })}
                </motion.div>
              </FloatingFocusManager>
            </FloatingOverlay>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
}
