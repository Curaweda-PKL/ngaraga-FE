import React from "react";
import type {PathRouteProps} from "react-router-dom";

const Home = React.lazy(() => import("@/lib/pages/home/Home"));
const Register = React.lazy(() => import("@/lib/pages/auth/login/register"));
const Login = React.lazy(() => import("@/lib/pages/auth/login/login"));
const Artists = React.lazy(() => import("@/lib/pages/artists/artists-index"));
const Marketplace = React.lazy(
  () => import("@/lib/pages/marketplace/marketplace-index")
);
const TopCollectors = React.lazy(
  () => import("@/lib/pages/top-players/top-players")
);
const Detail = React.lazy(() => import("@/lib/pages/detail-card/detail-index"));

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
  {
    path: "/artists",
    element: <Artists />,
  },
  {
    path: "/marketplace",
    element: <Marketplace />,
  },
  {
    path: "/rankings",
    element: <TopCollectors />,
  },
  {
    path: "/detail",
    element: <Detail />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [];
