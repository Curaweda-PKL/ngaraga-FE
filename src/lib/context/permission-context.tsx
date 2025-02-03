import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

type PermissionContextType = {
  permissions: string[];
  loading: boolean;
  role: string | null;
  refresh: () => Promise<void>;
};

// Provide a complete default value including `role`
const PermissionContext = createContext<PermissionContextType>({
  permissions: [],
  loading: true,
  role: null,
  refresh: async () => {},
});

export const PermissionProvider = ({ children }: { children: React.ReactNode }) => {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/me', { withCredentials: true });
      
      // Update permissions from the response
      setPermissions(response.data.permissions || []);

      setRole(response.data.role || null);  // ✅ Set the user's role correctly

    } catch (error) {
      console.error('Permission fetch failed:', error);
      setPermissions([]);
      setRole(null);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  useEffect(() => {
    if (initialLoad) {
      fetchPermissions();
    }
  }, [initialLoad]);

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
