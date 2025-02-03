import { usePermissions } from "@/lib/context/permission-context";
import { Navigate, useLocation } from "react-router-dom";

type RequireAuthProps = {
  children: React.ReactNode;
  redirectTo: string;
};

export const RequireAuth = ({ children, redirectTo }: RequireAuthProps) => {
  const { role, loading } = usePermissions();
  const location = useLocation();

  if (loading) {
    console.log("⏳ Waiting for role to load...");
    return <div>Loading...</div>; // Prevent redirects during loading
  }

  if (role === "SUPERADMIN") {
    console.log("✅ Superadmin access granted!");
    return children;  // Superadmin bypasses all checks
  }

  if (!role) {
    console.log("🔄 Redirecting to:", redirectTo);
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
};
