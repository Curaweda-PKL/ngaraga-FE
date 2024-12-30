import React from "react";
import Navbar from "./components/nav-admin";
import Sidebar from "./components/side-admin";

export default function AdminLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 mt-16 bg-white min-h-screen overflow-hidden w-full p-4">
        {children}
      </main>
    </div>
  );
}
