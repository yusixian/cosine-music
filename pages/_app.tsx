import Layout from '@/components/layout';
import { ThemeProvider as MaterialThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { ThemeProvider, useTheme } from 'next-themes';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode, useMemo } from 'react';
import { RecoilRoot } from 'recoil';

import { PaletteMode, StyledEngineProvider } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
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

  return (
    <>
      <Head>
        <title>Cosine Music</title>
        <meta name="description" content="A simple and elegant music website." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledEngineProvider injectFirst>
        <ThemeProvider attribute="class">
          <MaterialThemeProvider theme={themeOptions}>
            <QueryClientProvider client={queryClient}>
              <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
            </QueryClientProvider>
          </MaterialThemeProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}
export default App;
