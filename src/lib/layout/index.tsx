import type { ReactNode } from 'react';
import { Footer } from './components/footer';
import { Meta } from './components/meta';
import { Navbar } from './components/nav-user';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-hidden">
      {/* Meta tags for SEO */}
      <Meta />

      {/* Navbar */}
      <header className="text-white">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full">
        <div className="mx-auto w-full ">{children}</div>
      </main>

      {/* Footer */}
      <footer className="text-white w-full">
        <Footer />
      </footer>
    </div>
  );
};
