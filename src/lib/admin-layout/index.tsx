import React from "react";
import Navbar from "./components/nav-admin";
import Sidebar from "./components/side-admin";

// interface LayoutProps {
//   children: React.ReactNode;
// }

export default function AdminLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main className="ml-64 mt-12 bg-gray-100 min-h-screen">{children}</main>
    </div>
  );
}
