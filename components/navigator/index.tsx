import { MD_SCREEN_QUERY } from '@/constants';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useToggleTheme } from '@/hooks/useToggleTheme';
import { userInfoAtom } from '@/store/user/state';
import clsx, { ClassValue } from 'clsx';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { CgClose, CgDarkMode, CgMenu } from 'react-icons/cg';
import { useMediaQuery } from 'react-responsive';
import { useRecoilValue } from 'recoil';
import NavItem from './NavItem';

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

type NavigatorProps = {
  className?: ClassValue;
};

export const Navigator = ({ className }: NavigatorProps) => {
  const router = useRouter();
  const [selectIdx, setSelectIdx] = useState(0);
  const toggleTheme = useToggleTheme();
  const [mobileExpand, setMobileExpand] = useState(false);
  const isMdScreen = useMediaQuery({ query: MD_SCREEN_QUERY });
  const isMounted = useIsMounted();
  const userInfo = useRecoilValue(userInfoAtom);
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
      {
        key: 'BiUserCircle',
        icon: userInfo ? (
          <div className="flex items-center justify-center gap-2">
            <img
              src={userInfo?.avatar || '/img/default_avatar.png'}
              className="aspect-square h-9 rounded-full border-2 border-black"
              alt={userInfo?.user_name}
            />
            {userInfo?.name || userInfo?.user_name}
          </div>
        ) : (
          <BiUserCircle className="h-9 w-9 cursor-pointer" />
        ),
        onClick: () => router.push('/my'),
      },
    ],
    [router, toggleTheme, userInfo],
  );

  /** Set SelectIdx When Change Route */
  useEffect(() => {
    const path = router.pathname;
    for (let i = 0; i < routers.length; i++) {
      if (routers[i].path === path) {
        console.log('setSelectIdx', i, path);
        setSelectIdx(i);
        break;
      }
    }
    // router.pathname === '/' ? setSelectIdx(0) : setSelectIdx(1)
  }, [router.pathname, setSelectIdx]);

  if (!isMounted) return null;
  return (
    <div className={clsx('flex items-center', className)}>
      {isMdScreen ? (
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
                selected={selectIdx === idx}
                className="px-1 py-1"
                key={key ?? name}
                onClick={() => {
                  router.push(path);
                  setSelectIdx(idx);
                }}
                name={name}
                indicatorClass="inset-x-4"
              />
            ))}
            {buttons.map(({ key, icon, onClick }, idx) => (
              <NavItem
                selected={selectIdx === routers.length + idx + 1}
                className="px-1 py-1"
                key={key}
                onClick={onClick}
                icon={icon}
              />
            ))}
          </motion.ul>
        </motion.nav>
      ) : (
        <>
          <ul className="ml-4 flex h-full w-full flex-grow items-center gap-4">
            {routers.map(({ name, path, key }, idx) => (
              <NavItem
                selected={selectIdx === idx}
                indicatorClass="-bottom-2"
                className="px-2"
                key={key ?? name}
                onClick={() => {
                  router.push(path);
                  setSelectIdx(idx);
                }}
                name={name}
              />
            ))}
            <div className="ml-auto flex items-center gap-1">
              {buttons.map(({ key, icon, onClick }, idx) => (
                <NavItem
                  selected={selectIdx === routers.length + idx + 1}
                  className="px-1 py-1"
                  key={key}
                  onClick={onClick}
                  icon={icon}
                />
              ))}
            </div>
          </ul>
        </>
      )}
    </div>
  );
};
