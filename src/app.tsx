import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Layout } from '@/lib/layout'; 
import  AdminLayout  from '@/lib/admin-layout/index'; 
import { Routings } from '@/lib/router/routings';

const AppContent = () => {
  const location = useLocation();

  // List of routes to exclude from the layout
  const excludedRoutes = ['/login', '/signup', '/forgot-password', '/reset-password', '/login/admin', '/login/', '/signup/', '/forgot-password/', '/reset-password/', '/login/admin/', '/sentemail' , 'sentEmail/'];

  // Check if the route belongs to the CMS (admin) section
  const isAdminRoute = location.pathname.startsWith('/admin');

  return excludedRoutes.includes(location.pathname) ? (
    <Routings />
  ) : isAdminRoute ? (
    <AdminLayout> 
      <Routings />
    </AdminLayout>
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
