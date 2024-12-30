import React from "react";
import type {PathRouteProps} from "react-router-dom";
import {Dashboard} from "../admin-pages/dashboard-index";
import {OrderDetail} from "../admin-pages/detail-order";
import DetailSpecial from "@/lib/pages/detail-card/detail-special-index";
import DetailCards from "../pages/detail-card/detail-cards";

const ForgotPassword = React.lazy(
  () => import("@/lib/pages/auth/login/forgot-password")
);
const ResetPassword = React.lazy(
  () => import("@/lib/pages/auth/login/reset-password")
);
const Home = React.lazy(() => import("@/lib/pages/home/Home"));
const Signup = React.lazy(() => import("@/lib/pages/auth/login/signup"));
const Login = React.lazy(() => import("@/lib/pages/auth/login/login"));
const Artists = React.lazy(() => import("@/lib/pages/artists/artists-index"));
const Marketplace = React.lazy(
  () => import("@/lib/pages/marketplace/marketplace-index")
);
const TopCollectors = React.lazy(
  () => import("@/lib/pages/top-players/top-players")
);
const Cart = React.lazy(() => import("@/lib/pages/cart/mycart"));
const BrowseEvents = React.lazy(
  () => import("@/lib/pages/events/browse-event")
);
const EventDetail = React.lazy(
  () => import("@/lib/pages/event-detail/detail-events")
);

 

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
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
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
    path: "/detail-special-card",
    element: <DetailSpecial />,
  },
  {
    path: "detail-cards",
    element: <DetailCards/>
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
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin/order",
    element: <OrderDetail />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [];
