import React from "react";
import type {PathRouteProps} from "react-router-dom";

const Home = React.lazy(() => import("@/lib/pages/home/Home"));
const Register = React.lazy(() => import("@/lib/pages/auth/login/Register"));
const Login = React.lazy(() => import("@/lib/pages/auth/login/login"));
export const routes: Array<PathRouteProps> = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [];
