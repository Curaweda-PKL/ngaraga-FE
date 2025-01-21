import React from "react";
import type { PathRouteProps } from "react-router-dom";

// Admin Pages
import Dashboard from "../admin-pages/dashboard/index-admin";
import { Order } from "../admin-pages/order/order";
import { DetailsOrder } from "../admin-pages/order/details-order";
import { Card } from "../admin-pages/marketplace/card/card";
import { EditCard } from "../admin-pages/marketplace/card/edit-card";
import { AddCard } from "../admin-pages/marketplace/card/add-card";
import { SpecialCard } from "../admin-pages/marketplace/special-card/special-card";
import { EditSpecialCard } from "../admin-pages/marketplace/special-card/edit-specialcard";
import { AddSpecialCard } from "../admin-pages/marketplace/special-card/add-specialcard";
import { Categories } from "../admin-pages/marketplace/categories";
import { Master } from "../admin-pages/marketplace/master";
import { Series } from "../admin-pages/marketplace/series";
import { Tag } from "../admin-pages/marketplace/tag";
import { SignUpPage } from "../admin-pages/pages/sign-up";
import { SignInPage } from "../admin-pages/pages/sign-in";
import { HomeSection } from "../admin-pages/pages/Home/home";
import { MarketplaceForm } from "../admin-pages/pages/marketplace";
import { RankingsForm } from "../admin-pages/pages/rankings";
import { EventsForm } from "../admin-pages/pages/events";
import { Events } from "../admin-pages/event/events";
import { EditEvent } from "../admin-pages/event/edit-event";
import { AddEvents } from "../admin-pages/event/add-events";
import { Coupon } from "../admin-pages/coupon/coupon";
import { AddCouponForm } from "../admin-pages/coupon/add-coupon";
import { Creator } from "../admin-pages/creator";
import { Member } from "../admin-pages/member/member";
import { MemberDetails } from "../admin-pages/member/detail-member";
import { AddMember } from "../admin-pages/member/add-member";
import { Subscription } from "../admin-pages/subscription";
import { Shipping } from "../admin-pages/shipping";
import { Payment } from "../admin-pages/payment";
import { Admin } from "../admin-pages/admin/admin";
import { AddAdmin } from "../admin-pages/admin/add-admin";
import { ProfileSettings } from "../admin-pages/admin-profile";
import AdminLogin from "../pages/auth/login/admin-login";
import SentEmail from "../pages/auth/login/sentEmail";
import SuccesRegist from "../pages/events/success-regist";

// Lazy-loaded Pages
const DetailSpecial = React.lazy(() => import("@/lib/pages/detail-card/detail-special-index"));
const DetailCards = React.lazy(() => import("../pages/detail-card/detail-cards"));
const ForgotPassword = React.lazy(() => import("@/lib/pages/auth/login/forgot-password"));
const ResetPassword = React.lazy(() => import("@/lib/pages/auth/login/reset-password"));
const Home = React.lazy(() => import("@/lib/pages/home/Home"));
const Signup = React.lazy(() => import("@/lib/pages/auth/login/signup"));
const Login = React.lazy(() => import("@/lib/pages/auth/login/login"));
const Artists = React.lazy(() => import("@/lib/pages/artists/artists-index"));
const Account = React.lazy(() => import("@/lib/pages/account/account-index"));
const SpecialCardDetail = React.lazy(() => import("@/lib/pages/account/specialcard-details"));
const ViewDetail = React.lazy(() => import("@/lib/pages/account/view-details"));
const Marketplace = React.lazy(() => import("@/lib/pages/marketplace/marketplace-index"));
const TopCollectors = React.lazy(() => import("@/lib/pages/top-players"));
const Cart = React.lazy(() => import("@/lib/pages/cart"));
const BrowseEvents = React.lazy(() => import("@/lib/pages/events/browse-event"));
const EventDetail = React.lazy(() => import("@/lib/pages/events/detail-events"));
const EventRegistration = React.lazy(() => import("@/lib/pages/events/register-event"));
const Checkout = React.lazy(() => import("@/lib/pages/checkout/checkout-index"));
const PaymentPage = React.lazy(() => import("@/lib/pages/payment/payment"));
const OrderComplete = React.lazy(() => import("@/lib/pages/payment/complete"));

export const routes: Array<PathRouteProps> = [
  {path: "/admin/dashboard", element: <Dashboard />},
  {path: "/admin/order", element: <Order />},
  {path: "/admin/detail-order", element: <DetailsOrder />},
  {path: "/admin/card", element: <Card />},
  {path: "/admin/edit-card", element: <EditCard />},
  {path: "/admin/add-card", element: <AddCard />},
  {path: "/admin/special-card", element: <SpecialCard />},
  {path: "/admin/edit-special", element: <EditSpecialCard />},
  {path: "/admin/add-special", element: <AddSpecialCard />},
  {path: "/admin/master", element: <Master />},
  {path: "/admin/series", element: <Series />},
  {path: "/admin/categories", element: <Categories />},
  {path: "/admin/tag", element: <Tag />},
  {path: "/admin/sign-in", element: <SignInPage />},
  {path: "/admin/sign-up", element: <SignUpPage />},
  {path: "/admin/home", element: <HomeSection />},
  {path: "/admin/marketplace", element: <MarketplaceForm />},
  {path: "/admin/rankings", element: <RankingsForm />},
  {path: "/admin/events", element: <EventsForm />},
  {path: "/admin/event", element: <Events />},
  {path: "/admin/edit-event", element: <EditEvent />},
  {path: "/admin/add-event", element: <AddEvents />},
  {path: "/admin/coupon", element: <Coupon />},
  {path: "/admin/add-coupon", element: <AddCouponForm />},
  {path: "/admin/creator", element: <Creator />},
  {path: "/admin/member", element: <Member />},
  {path: "/admin/add-member", element: <AddMember />},
  {path: "/admin/detail-member", element: <MemberDetails />},
  {path: "/admin/subscription", element: <Subscription />},
  {path: "/admin/shipping", element: <Shipping />},
  {path: "/admin/payment", element: <Payment />},
  {path: "/admin/admin", element: <Admin />},
  {path: "/admin/add-admin", element: <AddAdmin />},
  {path: "/admin/profile", element: <ProfileSettings />},

  {path: "/", element: <Home />},
  {path: "/signup", element: <Signup />},
  {path: "/login", element: <Login />},
  {path: "/forgot-password", element: <ForgotPassword />},
  {path: "/reset-password", element: <ResetPassword />},
  {path: "/artist", element: <Artists />},
  {path: "/account", element: <Account />},
  {path: "/special-card-detail", element: <SpecialCardDetail />},
  {path: "/view-detail", element: <ViewDetail />},
  {path: "/marketplace", element: <Marketplace />},
  {path: "/rankings", element: <TopCollectors />},
  {path: "/detail-cards", element: <DetailCards />},
  {path: "/detail-special-card", element: <DetailSpecial />},
  {path: "/cart", element: <Cart />},
  {path: "/events", element: <BrowseEvents />},
  {path: "/detail-events", element: <EventDetail />},
  {path: "/register-events", element: <EventRegistration />},
  {path: "/checkout", element: <Checkout />},
  {path: "/payment", element: <PaymentPage />},
  {path: "/complete", element: <OrderComplete />},
  {path: "/login/admin", element: <AdminLogin />},
  {path: "/sentEmail", element: <SentEmail/> },
  {path: "/success/regist", element: <SuccesRegist/>}
  
];

export const privateRoutes: Array<PathRouteProps> = [];
