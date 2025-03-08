import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from "@/middleware/utils";

type PermissionContextType = {
  permissions: string[];
  loading: boolean;
  role: string | null;
  refresh: () => Promise<void>;
};

const PermissionContext = createContext<PermissionContextType>({
  permissions: [],
  loading: true,
  role: null,
  refresh: async () => {},
});

export const PermissionProvider = ({ children }: { children: React.ReactNode }) => {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${SERVER_URL}/api/me`, { withCredentials: true });
      setPermissions(response.data.permissions || []);
      setRole(response.data.role || null);
    } catch (error) {
      console.error('Permission fetch failed:', error);
      setPermissions([]);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  // Initial load plus polling every 60 seconds for real-time updates.
  useEffect(() => {
    fetchPermissions(); // initial load

    const interval = setInterval(() => {
      fetchPermissions();
    }, 60000); // poll every 60 seconds 

    return () => clearInterval(interval);
  }, []);

  return (
    <PermissionContext.Provider
      value={{
        permissions,
        loading,
        role,
        refresh: fetchPermissions,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissions = () => useContext(PermissionContext);
