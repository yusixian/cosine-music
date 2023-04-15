import clsx from 'clsx';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { poppins } from '../../constants/font';
import { Footer } from './footer';
import { Header } from './header';

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <div
      className={clsx(
        'flex h-screen min-h-screen flex-col bg-cos-gradient text-black dark:bg-cos-gradient-dark dark:text-white',
        poppins.variable,
      )}
    >
      <ToastContainer className="z-20" position="top-center" autoClose={3000} closeButton={false} />
      <Header />
      <main className="relative w-full flex-grow overflow-auto">{children}</main>
      <Footer className="justify-end" />
    </div>
  );
}
