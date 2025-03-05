import React, { lazy, Suspense, memo } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { PermissionProvider } from "@/lib/context/permission-context";

// Lazy load layouts and routings
const Layout = lazy(() =>
  import("@/lib/layout").then((module) => ({ default: module.Layout }))
);
const AdminLayout = lazy(() =>
  import("@/lib/admin-layout").then((module) => ({ default: module.default }))
);
const Routings = lazy(() =>
  import("@/lib/router/routings").then((module) => ({ default: module.Routings }))
);

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
  const content = excludedRoutes.includes(location.pathname) ? (
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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {content}
    </Suspense>
  );
});

export const App = () => (
  <Router>
    <AppContent />
  </Router>
);
