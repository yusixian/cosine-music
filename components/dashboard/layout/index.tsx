import clsx from 'clsx';
import { ReactNode, useMemo, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { UserType } from '@/api/type';
import Search from '@/components/search';
import { poppins } from '@/constants/font';
import { useDashboardGlobalPlayer } from '@/hooks/music';
import { useFetchUserInfoByAuth } from '@/hooks/user';
import { userInfoAtom } from '@/store/user/state';
import { AppBar, Box, IconButton, PaletteMode, Toolbar, Typography } from '@mui/material';
import { ThemeProvider as MaterialThemeProvider, createTheme } from '@mui/material/styles';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { MdArrowBackIosNew, MdMenu } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import DashboardNavigator from './navigator';

export default function DashboardLayout({ children }: { children?: ReactNode }) {
  const { theme } = useTheme();
  const themeOptions = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme as PaletteMode,
          primary: {
            main: '#e91e63',
          },
          secondary: {
            main: '#E499A4',
          },
        },
      }),
    [theme],
  );
  const [menuOpen, setMenuOpen] = useState(true);
  useFetchUserInfoByAuth();
  const userInfo = useRecoilValue(userInfoAtom);
  const router = useRouter();
  const dashboardPlayer = useDashboardGlobalPlayer();
  return (
    <MaterialThemeProvider theme={themeOptions}>
      <div
        className={clsx(
          'flex h-screen flex-col overflow-hidden bg-cos-gradient-main text-black dark:bg-cos-gradient-main-dark dark:text-white',
          poppins.variable,
        )}
      >
        <ToastContainer className="z-30" position="top-center" autoClose={3000} closeButton={false} />
        <AppBar position="relative">
          <Toolbar>
            <IconButton
              onClick={() => setMenuOpen(!menuOpen)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              {menuOpen ? <MdArrowBackIosNew /> : <MdMenu />}
            </IconButton>
            <Typography
              className="flex-grow cursor-pointer"
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
              onClick={() => router.push('/dashboard')}
            >
              Cosine Music 后台管理系统
            </Typography>
            <Search />
          </Toolbar>
        </AppBar>
        <div className="flex flex-grow overflow-auto">
          <DashboardNavigator open={menuOpen} className="h-full" />
          {userInfo && userInfo?.type === UserType.ADMIN && (
            <Box component="main" className="h-full overflow-auto" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
              {children}
            </Box>
          )}
        </div>
        <div className="relative">{dashboardPlayer}</div>
      </div>
    </MaterialThemeProvider>
  );
}
