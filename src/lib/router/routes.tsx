import React from "react";
import type {PathRouteProps} from "react-router-dom";

import Dashboard from "../admin-pages/dashboard";
import {OrderDetail} from "../admin-pages/detail-order";
import {Card} from "../admin-pages/card";
import {SpecialCard} from "../admin-pages/spceial-card";
import {Categories} from "../admin-pages/categories";
import {Tag} from "../admin-pages/tag";
import {Events} from "../admin-pages/events";
import {Coupon} from "../admin-pages/coupon";
import {Creator} from "../admin-pages/creator";
import {Member} from "../admin-pages/member";
import {Subscription} from "../admin-pages/subscription";
import {Shipping} from "../admin-pages/shipping";
import {Payment} from "../admin-pages/payment";
import {Admin} from "../admin-pages/admin";

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
import DetailSpecial from "@/lib/pages/detail-card/detail-special-index";
import DetailCards from "../pages/detail-card/detail-cards";

export const routes: Array<PathRouteProps> = [
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin/order",
    element: <OrderDetail />,
  },
  {
    path: "/admin/card",
    element: <Card />,
  },
  {
    path: "/admin/special",
    element: <SpecialCard />,
  },
  {
    path: "/admin/categories",
    element: <Categories />,
  },
  {
    path: "/admin/tag",
    element: <Tag />,
  },
  {
    path: "/admin/event",
    element: <Events />,
  },
  {
    path: "/admin/coupon",
    element: <Coupon />,
  },
  {
    path: "/admin/creator",
    element: <Creator />,
  },
  {
    path: "/admin/member",
    element: <Member />,
  },
  {
    path: "/admin/subscription",
    element: <Subscription />,
  },
  {
    path: "/admin/shipping",
    element: <Shipping />,
  },
  {
    path: "/admin/payment",
    element: <Payment />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
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
    element: <DetailCards />,
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
