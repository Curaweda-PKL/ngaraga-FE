import React from 'react';
import type { PathRouteProps } from 'react-router-dom';
import { MarketHeader } from '../pages/marketplace/marketplace-index';

const Home = React.lazy(() => import('@/lib/pages/home/home'));
const Register = React.lazy(() => import('@/lib/pages/auth/login/register'));
const Login = React.lazy(() => import('@/lib/pages/auth/login/login'));
const Artists = React.lazy(() => import('@/lib/pages/artists/artists-index'));

export const routes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/artists',
    element: <Artists />,
  },
  {
    path: '/marketplace',
    element: <MarketHeader/>
  },
];

export const privateRoutes: Array<PathRouteProps> = [];
