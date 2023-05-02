import clsx from 'clsx';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { poppins } from '../../constants/font';
import { Footer } from './footer';
import { Header } from './header';
import { useFetchUserInfoByAuth } from '@/hooks/user';

export default function Layout({ children }: { children?: ReactNode }) {
  useFetchUserInfoByAuth();
  return (
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
  );
}
