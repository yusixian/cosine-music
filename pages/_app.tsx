import Layout from '@/components/layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import 'aplayer/dist/APlayer.min.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  return (
    <>
      <Head>
        <title>Cosine Music</title>
        <meta name="description" content="A simple and elegant music website." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider attribute="class">
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
export default App;
