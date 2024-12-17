import React from "react";
import type {PathRouteProps} from "react-router-dom";

const ForgotPassword = React.lazy(() => import("@/lib/pages/auth/login/forgot-password"))
const ResetPassword = React.lazy(() => import("@/lib/pages/auth/login/reset-password"))
const Home = React.lazy(() => import("@/lib/pages/home/Home"));
const Signup = React.lazy(() => import("@/lib/pages/auth/login/signup"));
const Login = React.lazy(() => import("@/lib/pages/auth/login/login"));
const Artists = React.lazy(() => import("@/lib/pages/artists/artists-index"));
const Marketplace = React.lazy(() => import("@/lib/pages/marketplace/marketplace-index"));
const TopCollectors = React.lazy(() => import("@/lib/pages/top-players/top-players"));
const Detail = React.lazy(() => import("@/lib/pages/detail-card/detail-index"));
const Cart = React.lazy(() => import("@/lib/pages/cart/mycart"));
const BrowseEvents = React.lazy(() => import("@/lib/pages/events/browse-event"));
const EventDetail = React.lazy(() => import("@/lib/pages/event-detail/detail-events"));

export const routes: Array<PathRouteProps> = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword/>
  },
  {
    path: "/reset-password",
    element: <ResetPassword/>
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
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/events",
    element: <BrowseEvents />,
  },
  {
    path: "/detailevents",
    element: <EventDetail />,
  },

];

export const privateRoutes: Array<PathRouteProps> = [];
