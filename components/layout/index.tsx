import clsx from 'clsx';
import { ReactNode, useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import { poppins } from '../../constants/font';
import { Footer } from './footer';
import { Header } from './header';
import { useFetchUserInfoByAuth } from '@/hooks/user';
import { PaletteMode, StyledEngineProvider } from '@mui/material';
import { ThemeProvider as MaterialThemeProvider, createTheme } from '@mui/material/styles';
import { useTheme } from 'next-themes';

export default function Layout({ children }: { children?: ReactNode }) {
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
  useFetchUserInfoByAuth();
  return (
    <StyledEngineProvider injectFirst>
      <MaterialThemeProvider theme={themeOptions}>
        <div
          className={clsx(
            'flex h-screen min-h-screen flex-col overflow-auto bg-cos-gradient-main text-black dark:bg-cos-gradient-main-dark dark:text-white',
            poppins.variable,
          )}
        >
          <ToastContainer className="z-30" position="top-center" autoClose={3000} closeButton={false} />
          <Header />
          <main className="relative w-full flex-grow overflow-auto">{children}</main>
          <Footer className="justify-end" />
        </div>
      </MaterialThemeProvider>
    </StyledEngineProvider>
  );
}
