import type {ReactNode} from "react";
import {Footer} from "./components/footer";
import {Navbar} from "./components/nav-user";
import {Meta} from "./components/meta";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({children}: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Meta />
      <Navbar />
      <main className="flex-1 wrapper p-4">{children}</main>
      <Footer />
    </div>
  );
};
