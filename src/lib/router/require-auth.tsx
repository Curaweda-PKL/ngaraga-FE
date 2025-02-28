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
    // Display a loading spinner skeleton while permissions load.
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (role === "SUPERADMIN") {
    console.log("✅ Superadmin access granted!");
    return children;  // Superadmin bypasses all checks.
  }

  if (!role) {
    console.log("🔄 Redirecting to:", redirectTo);
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
};
