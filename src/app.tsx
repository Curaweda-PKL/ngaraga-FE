import { BrowserRouter as Router, useLocation } from 'react-router-dom';

import { Layout } from '@/lib/layout';
import { Routings } from '@/lib/router/routings';

const AppContent = () => {
  const location = useLocation();

  // List of routes to exclude from the layout
  const excludedRoutes = ['/login', '/signup', '/forgot-password', '/reset-password'];

  // Conditionally render the Layout component
  return excludedRoutes.includes(location.pathname) ? (
    <Routings />
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

