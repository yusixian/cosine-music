import { useToggleTheme } from '@/hooks/useToggleTheme';
import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CgDarkMode, CgMenu, CgClose } from 'react-icons/cg';
import { isMobile } from 'react-device-detect';
import { useIsMounted } from '@/hooks/useIsMounted';

const routers: { name: string; key?: string; path: string }[] = [
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

export function Header() {
  const router = useRouter();
  const [selectIdx, setSelectIdx] = useState(0);
  const toggleTheme = useToggleTheme();
  const [mobileExpand, setMobileExpand] = useState(false);
  const isMounted = useIsMounted();

  if (!isMounted) return null;
  return (
    <header className="flex min-h-[4.5rem] w-full items-center justify-between gap-4 px-4 py-2">
      <div className="cursor-pointer whitespace-nowrap text-2xl font-bold" onClick={() => router.push('/')}>
        Cosine Music
      </div>
      {isMobile ? (
        <motion.nav initial={false} animate={mobileExpand ? 'open' : 'closed'} className="menu">
          <motion.div
            whileTap={{ scale: 1.3 }}
            className="relative h-8 w-8"
            onClick={() => setMobileExpand(!mobileExpand)}
            animate={
              {
                // rotate: mobileExpand ? 45 : 0,
                // scale: mobileExpand ? 1.2 : 1,
              }
            }
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
          >
            {/* 第一个图标 */}
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

            {/* 第二个图标 */}
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
              'fixed top-16 right-4 z-20 flex min-w-[7rem] flex-col items-center rounded-2xl border bg-indigo-100 shadow-xl dark:border-white dark:bg-gray-900',
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
              <motion.li
                variants={itemVariants}
                className={clsx('relative m-2 cursor-pointer text-xl hover:opacity-80', { 'text-primary': selectIdx === idx })}
                key={key ?? name}
                onClick={() => {
                  router.push(path);
                  setSelectIdx(idx);
                }}
              >
                {name}
                {selectIdx === idx && (
                  <motion.div
                    className="absolute inset-x-0 -bottom-1 border-t-2 border-primary"
                    layoutId="header_tab_selected"
                  />
                )}
              </motion.li>
            ))}
            <motion.li key="toggleTheme" variants={itemVariants}>
              <CgDarkMode className="m-2 cursor-pointer text-3xl" onClick={toggleTheme} />
            </motion.li>
          </motion.ul>
        </motion.nav>
      ) : (
        <>
          <div className="ml-4 flex h-full flex-grow gap-4">
            {routers.map(({ name, path, key }, idx) => (
              <div
                className={clsx(
                  'relative flex cursor-pointer items-center rounded-lg px-5 text-xl transition-all',
                  selectIdx === idx ? 'text-primary' : 'hover:scale-100 hover:opacity-80',
                )}
                key={key ?? name}
                onClick={() => {
                  router.push(path);
                  setSelectIdx(idx);
                }}
              >
                {name}
                {selectIdx === idx && (
                  <motion.div
                    className="absolute inset-x-0 -bottom-1 border-t-2 border-primary"
                    layoutId="header_tab_selected"
                  />
                )}
              </div>
            ))}
          </div>
          <CgDarkMode className="cursor-pointer text-3xl" onClick={toggleTheme} />
        </>
      )}
    </header>
  );
}
