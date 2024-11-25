import type { ReactNode } from 'react';

// import { ThemeProvider } from 'next-themes';
import { Footer } from './components/footer';
import { Navbar } from './components/nav-user';
import { Meta } from './components/meta';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    // <ThemeProvider attribute="class">
    <div>
      <Meta />
      <div >
        <Navbar />
        <main className="wrapper">{children}</main>
        <Footer />
      </div>
      </div>
  );
};
