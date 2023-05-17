import NavItem from '@/components/navigator/NavItem';
import { Avatar, Card, List, ListItem, ListItemButton } from '@mui/material';
import { motion } from 'framer-motion';

import { UserType } from '@/api/type';
import { useToggleTheme } from '@/hooks/useToggleTheme';
import { userInfoAtom } from '@/store/user/state';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { CgDarkMode } from 'react-icons/cg';
import { useRecoilValue } from 'recoil';

const routers: {
  name?: string;
  key?: string;
  path: string;
  type?: UserType.ADMIN;
}[] = [
  { name: '仪表盘', path: '/' },
  { name: '首页管理', path: '/home' },
  { name: '音乐管理', path: '/music' },
  { name: '标签管理', path: '/tag' },
  // { name: '歌单管理', path: '/playlist' },
  // { name: '用户管理', path: '/user' },
  // { name: '分区管理', path: '/category' },
];

export default function DashboardNavigator({ className, open }: { className?: string; open?: boolean }) {
  const toggleTheme = useToggleTheme();
  const userInfo = useRecoilValue(userInfoAtom);
  const router = useRouter();
  const [selectIdx, setSelectIdx] = useState(() => {
    const path = router.pathname.slice(10) || '/';
    const idx = routers.findIndex((r) => r.path === path);
    return idx;
  });

  const buttons = useMemo(
    () => [
      { name: '返回主页', onClick: () => router.push('/'), type: UserType.ADMIN },
      {
        key: 'CgDarkMode',
        icon: <CgDarkMode className="h-9 w-9 cursor-pointer" />,
        onClick: toggleTheme,
      },
      {
        key: 'BiUserCircle',
        icon: userInfo ? (
          <div className="flex items-center justify-center gap-2">
            <Avatar alt={userInfo?.user_name} src={userInfo?.avatar || '/img/default_avatar.png'} />
            <div className="flex flex-col items-center justify-center gap-1">
              <p>{userInfo?.name}</p>
              <p className="text-sm text-gray-500">@{userInfo?.name || userInfo?.user_name}</p>
            </div>
          </div>
        ) : (
          <BiUserCircle className="h-9 w-9 cursor-pointer" />
        ),
        onClick: () => router.push('/my'),
      },
    ],
    [router, toggleTheme, userInfo],
  );
  return (
    <motion.div animate={{ scaleX: open ? 1 : 0, x: open ? 0 : -100, width: open ? '11rem' : 0 }} className={className}>
      <Card className="h-full w-full rounded-none">
        <List>
          {routers.map(({ name, path, key }, idx) => (
            <ListItem key={key ?? name} disablePadding>
              <ListItemButton>
                <NavItem
                  selected={selectIdx === idx}
                  className="w-full px-1 py-1"
                  onClick={() => {
                    router.push(`/dashboard${path}`);
                    setSelectIdx(idx);
                  }}
                  name={name}
                  indicatorClass="inset-x-4"
                />
              </ListItemButton>
            </ListItem>
          ))}
          {buttons.map(({ key, icon, onClick, type, name }, idx) => (
            <ListItem key={key ?? name} disablePadding>
              <ListItemButton>
                <NavItem
                  type={type}
                  selected={selectIdx === routers.length + idx + 1}
                  className="w-full px-1 py-1"
                  onClick={onClick}
                  icon={icon}
                  name={name}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Card>
    </motion.div>
  );
}
