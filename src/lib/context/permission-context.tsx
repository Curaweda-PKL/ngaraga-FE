import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

type PermissionContextType = {
  permissions: string[];
  loading: boolean;
  refresh: () => Promise<void>;
};

const PermissionContext = createContext<PermissionContextType>({
  permissions: [],
  loading: true,
  refresh: async () => {},
});

export const PermissionProvider = ({ children }: { children: React.ReactNode }) => {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/me', { withCredentials: true });
      setPermissions(response.data.permissions || []);
    } catch (error) {
      console.error('Permission fetch failed:', error);
      setPermissions([]);
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
    <PermissionContext.Provider value={{ 
      permissions,
      loading,
      refresh: fetchPermissions
    }}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissions = () => useContext(PermissionContext);