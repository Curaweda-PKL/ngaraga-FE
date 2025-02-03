/**
 * @note
 * for hook alternative of route element composition:
 * - https://reactrouter.com/docs/en/v6/upgrading/v5#use-useroutes-instead-of-react-router-config
 * - https://reactrouter.com/docs/en/v6/examples/route-objects
 *
 * might need to take notes on:
 * - https://reactrouter.com/docs/en/v6/upgrading/v5#note-on-link-to-values
 */


import  { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Page404 from '@/lib/pages/auth/404';
import { RequireAuth } from './require-auth';
import { RequireAdmin } from '../context/require-admin';
import { privateRoutes, routes, adminRoutes } from './routes';

export const Routings = () => {
  return (
    <Suspense>
      <Routes>
        {/* Public Routes */}
        {routes.map((routeProps) => (
          <Route {...routeProps} key={routeProps.path as string} />
        ))}

        {/* Protected Private Routes */}
        {privateRoutes.map(({ element, ...privateRouteProps }) => (
          <Route
            element={
              <RequireAuth redirectTo={`/login?redirectTo=${privateRouteProps.path}`}>
                {element}
              </RequireAuth>
            }
            {...privateRouteProps}
            key={`privateRoute-${privateRouteProps.path}`}
          />
        ))}

        {/* Protected Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <RequireAuth redirectTo="/login/admin">
              <RequireAdmin>
                <Routes>
                  {adminRoutes.map(({ element, ...adminRouteProps }) => (
                    <Route element={element} {...adminRouteProps} key={adminRouteProps.path} />
                  ))}
                  {/* Redirect unknown admin routes to login */}
                  <Route path="*" element={<Navigate to="/login/admin" replace />} />
                </Routes>
              </RequireAdmin>
            </RequireAuth>
          }
        />

        {/* Catch-All Route */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  );
};
