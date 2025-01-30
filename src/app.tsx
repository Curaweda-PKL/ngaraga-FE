import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { Layout } from "@/lib/layout";
import AdminLayout from "@/lib/admin-layout";
import { Routings } from "@/lib/router/routings";
import { PermissionProvider } from "@/lib/context/permission-context";

const AppContent = () => {
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

  return excludedRoutes.includes(location.pathname) ? (
    <Routings />
  ) : isAdminRoute ? (
    <PermissionProvider>
      <AdminLayout>
        <Routings />
      </AdminLayout>
    </PermissionProvider>
  ) : (
    <Layout>
      <Routings />
    </Layout>
  );
};

export const App = () => (
  <Router>
    <AppContent />
  </Router>
);
