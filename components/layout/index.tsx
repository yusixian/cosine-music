import { useGlobalPlayer } from '@/hooks/music';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useFetchUserInfoByAuth } from '@/hooks/user';
import { PaletteMode } from '@mui/material';
import { ThemeProvider as MaterialThemeProvider, createTheme } from '@mui/material/styles';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { ReactNode, useMemo, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import { poppins } from '../../constants/font';
import DashboardLayout from '../dashboard/layout';
import { Header } from './header';
import { useRecoilValue } from 'recoil';
import { globalConfigAtom } from '@/store/music/state';
import { motion } from 'framer-motion';
import FloatingActions from '../dashboard/layout/FloatingActions';

export default function Layout({ children, dashboard }: { children?: ReactNode; dashboard?: boolean }) {
  const { theme } = useTheme();
  const isMounted = useIsMounted();
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
  const player = useGlobalPlayer();
  const { playerShow } = useRecoilValue(globalConfigAtom);
  const containerRef = useRef(null);

  useFetchUserInfoByAuth();
  if (!isMounted) return null;
  return (
    <div>
      {dashboard ? (
        <DashboardLayout>{children}</DashboardLayout>
      ) : (
        <MaterialThemeProvider theme={themeOptions}>
          <div
            ref={containerRef}
            className={clsx(
              'relative flex h-screen min-h-screen flex-col overflow-auto bg-cos-gradient-main text-black dark:bg-cos-gradient-main-dark dark:text-white',
              poppins.variable,
            )}
          >
            <ToastContainer className="z-30" position="top-center" autoClose={3000} closeButton={false} />
            <Header />
            <div id="player" className="bg-red-400"></div>
            <main className="relative w-full flex-grow overflow-auto">{children}</main>
            <motion.div drag dragConstraints={containerRef} className="relative">
              {isMounted && <FloatingActions />}
            </motion.div>
          </div>
        </MaterialThemeProvider>
      )}
      <div className={clsx('fixed inset-x-0 bottom-0 z-20 transition', playerShow ? '' : 'translate-y-full')}>{player}</div>
    </div>
  );
}
