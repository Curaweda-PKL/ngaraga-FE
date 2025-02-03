import { usePermissions } from "@/lib/context/permission-context";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
    const { role, loading } = usePermissions();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (role === "SUPERADMIN") {
    console.log("✅ Superadmin access granted!");
    return children;  
  }

  if (role !== "ADMIN") {
    return <Navigate to="/login/admin" state={{ from: location }} replace />;
  }

  return children;
};