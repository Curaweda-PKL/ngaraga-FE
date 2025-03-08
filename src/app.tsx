import React, { memo } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { PermissionProvider } from "@/lib/context/permission-context";
import { Layout } from "@/lib/layout";
import AdminLayout from "@/lib/admin-layout";
import { Routings } from "@/lib/router/routings";

const AppContent = memo(() => {
  const location = useLocation();
  const excludedRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/login/admin",
    "/sentemail",
  ];

  const isAdminRoute = location.pathname.startsWith("/admin");

  // Choose the layout based on the current route
  return excludedRoutes.includes(location.pathname) ? (
    <Routings />
  ) : (
    <PermissionProvider>
      {isAdminRoute ? (
        <AdminLayout>
          <Routings />
        </AdminLayout>
      ) : (
        <Layout>
          <Routings />
        </Layout>
      )}
    </PermissionProvider>
  );
});

export const App = () => (
  <Router>
    <AppContent />
  </Router>
);
