import React from "react";
import Navbar from "./components/nav-admin";
import Sidebar from "./components/side-admin";
import { usePermissions } from '@/lib/context/permission-context';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { loading } = usePermissions();

  if (loading) {
    return (
      <div className="flex">
        {/* Navbar */}
        <Navbar />

        {/* Sidebar */}
        <Sidebar />

        {/* Skeleton Loader for Main Content */}
        <main className="ml-64 mt-16 bg-white min-h-screen overflow-hidden w-full p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-5/6"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            <div className="h-6 bg-gray-200 rounded w-full"></div>
            <div className="h-6 bg-gray-200 rounded w-4/5"></div>
          </div>
        </main>
      </div>
    );
  }

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
