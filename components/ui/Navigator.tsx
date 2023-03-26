import { ClassValue } from 'clsx';
import { useRouter } from 'next/router';
import { useToggleTheme } from '@/hooks/useToggleTheme';
import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
import { useMemo, useState } from 'react';
import { CgDarkMode, CgMenu, CgClose } from 'react-icons/cg';
import { isMobile } from 'react-device-detect';
import { useIsMounted } from '@/hooks/useIsMounted';
import { AiFillGithub } from 'react-icons/ai';

const routers: {
  name?: string;
  key?: string;
  path: string;
}[] = [
  { name: '首页', path: '/' },
  { name: '推荐', path: '/recommend' },
  { name: '我的', path: '/my' },
  { name: '关于', path: '/about' },
];

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

type NavigatorProps = {
  className?: ClassValue;
};

type NavItemProps = {
  selectIdx: number;
  idx: number;
  name?: string;
  icon?: JSX.Element;
  onClick: () => void;
  className?: ClassValue;

  indicatorClass?: string;
};
function NavItem({ selectIdx, idx, icon, name, onClick, className, indicatorClass }: NavItemProps) {
  return (
    <motion.li
      variants={itemVariants}
      className={clsx(
        'relative flex cursor-pointer justify-center text-xl hover:opacity-70',
        {
          'text-primary': selectIdx === idx,
        },
        className,
      )}
      onClick={onClick}
    >
      {icon}
      {name}
      {selectIdx === idx && (
        <motion.div
          className={clsx('absolute inset-x-0 -bottom-1 border-t-2 border-primary', indicatorClass)}
          layoutId="header_tab_selected"
        />
      )}
    </motion.li>
  );
}

export const Navigator = ({ className }: NavigatorProps) => {
  const router = useRouter();
  const [selectIdx, setSelectIdx] = useState(0);
  const toggleTheme = useToggleTheme();
  const [mobileExpand, setMobileExpand] = useState(false);
  const isMounted = useIsMounted();

  const buttons = useMemo(
    () => [
      {
        key: 'Github',
        icon: <AiFillGithub className="h-9 w-9 cursor-pointer" />,
        onClick: () => window?.open('https://github.com/yusixian/cosine-music', '_blank'),
      },
      {
        key: 'CgDarkMode',
        icon: <CgDarkMode className="h-9 w-9 cursor-pointer" />,
        onClick: toggleTheme,
      },
    ],
    [toggleTheme],
  );

  if (!isMounted) return null;
  return (
    <div className={clsx('flex items-center', className)}>
      {isMobile ? (
        <motion.nav initial={false} animate={mobileExpand ? 'open' : 'closed'} className="flex w-full justify-end">
          <motion.div
            whileTap={{ scale: 1.3 }}
            className="relative h-8 w-8"
            onClick={() => setMobileExpand(!mobileExpand)}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
          >
            <motion.span
              className="absolute inset-0 cursor-pointer text-3xl"
              initial={{ opacity: 0 }}
              animate={{
                opacity: mobileExpand ? 0 : 1,
                transition: {
                  delay: mobileExpand ? 0.1 : 0,
                },
              }}
            >
              <CgMenu />
            </motion.span>
            <motion.span
              className="absolute inset-0 cursor-pointer text-3xl"
              initial={{ opacity: 0 }}
              animate={{
                opacity: mobileExpand ? 1 : 0,
                transition: {
                  delay: mobileExpand ? 0 : 0.1,
                },
              }}
            >
              <CgClose />
            </motion.span>
          </motion.div>
          <motion.ul
            className={clsx(
              'fixed top-16 right-4 z-20 flex min-w-[7rem] flex-col items-stretch gap-1 rounded-2xl border border-secondary bg-tertiary py-2 shadow-xl dark:border-white dark:bg-gray-900',
              mobileExpand ? 'pointer-events-auto' : 'pointer-events-none',
            )}
            variants={{
              open: {
                clipPath: 'inset(0% 0% 0% 0% round 10px)',
                transition: {
                  ease: 'easeInOut',
                  duration: 0.4,
                  delayChildren: 0.3,
                  staggerChildren: 0.05,
                },
              },
              closed: {
                clipPath: 'inset(10% 50% 90% 50% round 10px)',
                transition: {
                  ease: 'easeInOut',
                  duration: 0.2,
                },
              },
            }}
            style={{ pointerEvents: mobileExpand ? 'auto' : 'none' }}
          >
            {routers.map(({ name, path, key }, idx) => (
              <NavItem
                className="px-1 py-1"
                key={key ?? name}
                onClick={() => {
                  router.push(path);
                  setSelectIdx(idx);
                }}
                selectIdx={selectIdx}
                name={name}
                idx={idx}
                indicatorClass="inset-x-4"
              />
            ))}
            {buttons.map(({ key, icon, onClick }, idx) => (
              <NavItem
                className="px-1 py-1"
                key={key}
                onClick={onClick}
                selectIdx={selectIdx}
                icon={icon}
                idx={routers.length + idx + 1}
              />
            ))}
          </motion.ul>
        </motion.nav>
      ) : (
        <>
          <ul className="ml-4 flex h-full w-full flex-grow items-center gap-4">
            {routers.map(({ name, path, key }, idx) => (
              <NavItem
                indicatorClass="-bottom-2"
                className="px-2"
                key={key ?? name}
                onClick={() => {
                  router.push(path);
                  setSelectIdx(idx);
                }}
                selectIdx={selectIdx}
                name={name}
                idx={idx}
              />
            ))}
            <div className="ml-auto flex items-center gap-1">
              {buttons.map(({ key, icon, onClick }, idx) => (
                <NavItem
                  className="px-1 py-1"
                  key={key}
                  onClick={onClick}
                  selectIdx={selectIdx}
                  icon={icon}
                  idx={routers.length + idx + 1}
                />
              ))}
            </div>
          </ul>
        </>
      )}
    </div>
  );
};
