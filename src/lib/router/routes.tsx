import React from "react";
import type {PathRouteProps} from "react-router-dom";

// Admin Pages
import Dashboard from "../admin-pages/dashboard/index-admin";
import {Order} from "../admin-pages/order/order";
import {DetailsOrder} from "../admin-pages/order/details-order";
import {Card} from "../admin-pages/marketplace/card/card";
import {EditCard} from "../admin-pages/marketplace/card/edit-card";
import {AddCard} from "../admin-pages/marketplace/card/addcard/add-card";
import {SpecialCard} from "../admin-pages/marketplace/special-card/special-card";
import {EditSpecialCard} from "../admin-pages/marketplace/special-card/edit-specialcard";
import {AddSpecialCard} from "../admin-pages/marketplace/special-card/addspecialcard/add-specialcard";
import {Categories} from "../admin-pages/marketplace/categories/categories";
import {Master} from "../admin-pages/marketplace/master";
import {Series} from "../admin-pages/marketplace/series";
import {Tag} from "../admin-pages/marketplace/tag";
import {SignUpPage} from "../admin-pages/pages/sign-up";
import {SignInPage} from "../admin-pages/pages/sign-in";
import {HomeSection} from "../admin-pages/pages/Home/home";
import {MarketplaceForm} from "../admin-pages/pages/marketplace";
import {RankingsForm} from "../admin-pages/pages/rankings";
import {EventsForm} from "../admin-pages/pages/events";
import {Events} from "../admin-pages/event/events";
import {EditEvents} from "../admin-pages/event/edit-event";
import {AddEvents} from "../admin-pages/event/add-events";
import {Coupon} from "../admin-pages/coupon/coupon";
import {AddCouponForm} from "../admin-pages/coupon/add-coupon";
import {Creator} from "../admin-pages/creator";
import {Member} from "../admin-pages/member/member";
import {MemberDetails} from "../admin-pages/member/detail-member";
import {AddMember} from "../admin-pages/member/add-member";
import {Subscription} from "../admin-pages/subscription";
import {Shipping} from "../admin-pages/shipping";
import {Payment} from "../admin-pages/payment";
import {Admin} from "../admin-pages/admin/admin";
import {AddAdmin} from "../admin-pages/admin/add-admin";
import {ProfileSettings} from "../admin-pages/admin-profile";

import AdminLogin from "../pages/auth/login/admin-login";
import SentEmail from "../pages/auth/login/sentEmail";
import SuccesRegist from "../pages/events/success-regist";

import {EditProfileAdmin} from "../admin-pages/admin/edit-admin";
import {EditCouponForm} from "../admin-pages/coupon/edit-coupon";
import {RegisteredUsers} from "../admin-pages/event/registered-user";
import SuccessVerify from "../pages/events/success-verify";
import QrCodeComponent from "../pages/scan-qr/scan-qr";
import QrCodesPage from "../admin-pages/marketplace/card/qrModal/qrPages";
import SpecialQrCodesPage from "../admin-pages/marketplace/card/qrModal/specialQrpages";
import AssignRequirement from "../admin-pages/marketplace/special-card/assign-card";

// Lazy-loaded Pages
const Home = React.lazy(() => import("@/lib/pages/home/Home"));
const Signup = React.lazy(() => import("@/lib/pages/auth/login/signup"));
const Login = React.lazy(() => import("@/lib/pages/auth/login/login"));
const ForgotPassword = React.lazy(
  () => import("@/lib/pages/auth/login/forgot-password")
);
const ResetPassword = React.lazy(
  () => import("@/lib/pages/auth/login/reset-password")
);
const Artists = React.lazy(() => import("@/lib/pages/artists/artists-index"));
const Account = React.lazy(() => import("@/lib/pages/account/account-index"));
const Marketplace = React.lazy(
  () => import("@/lib/pages/marketplace/marketplace-index")
);
const Cart = React.lazy(() => import("@/lib/pages/cart"));
const TopCollectors = React.lazy(
  () => import("@/lib/pages/top-ranking-collectors/top-players")
);
const SpecialCardDetail = React.lazy(
  () => import("@/lib/pages/account/specialcard-details")
);
const ViewDetail = React.lazy(() => import("@/lib/pages/account/view-details"));
// const DetailSpecial = React.lazy(
//   () => import("@/lib/pages/detail-card/detail-special-index")
// );
const DetailCards = React.lazy(
  () => import("../pages/detail-card/detail-cards-index")
);
const PaymentPage = React.lazy(() => import("@/lib/pages/payment/payment"));
const OrderComplete = React.lazy(() => import("@/lib/pages/payment/complete"));
const OrderDetails = React.lazy(
  () => import("@/lib//pages/payment/order-detail")
);
const BrowseEvents = React.lazy(
  () => import("@/lib/pages/events/browse-event")
);
const DetailEvents = React.lazy(
  () => import("@/lib/pages/events/detail-event-index")
);
const EventRegistration = React.lazy(
  () => import("@/lib/pages/events/register-event")
);
const Checkout = React.lazy(
  () => import("@/lib/pages/checkout/checkout-index")
);
const CheckoutExisting = React.lazy(
  () => import("@/lib/pages/checkout/chekout-existing-index")
);
const EditProfile = React.lazy(
  () => import("@/lib/pages/account/edit-profile-index")
);

export const routes: Array<PathRouteProps> = [
  {path: "/signup", element: <Signup />},
  {path: "/login", element: <Login />},
  {path: "/forgot-password", element: <ForgotPassword />},
  {path: "/reset-password", element: <ResetPassword />},
  {path: "/", element: <Home />},
  {path: "/account/:name", element: <Artists />},
  {path: "/marketplace", element: <Marketplace />},
  {path: "/detail-cards/:id", element: <DetailCards />},
  {path: "/special-card-detail", element: <SpecialCardDetail specialCardId={1} onBack={() => window.history.back()} />  },
  {path: "/view-detail", element: <ViewDetail />},
  {path: "/rankings", element: <TopCollectors />},
  {path: "/events", element: <BrowseEvents />},
  {path: "/detail-events/:id", element: <DetailEvents />},
  {path: "/login/admin", element: <AdminLogin />},
  {path: "/sentEmail", element: <SentEmail />},
  {path: "/success/registered/event", element: <SuccesRegist />},
  {path: "/success/emailverified", element: <SuccessVerify />},
  {path: "/scan-qr", element: <QrCodeComponent />},


];

export const privateRoutes: Array<PathRouteProps> = [
  {path: "/checkout-existing", element: <CheckoutExisting />},
  {path: "/account", element: <Account />},
  {path: "/account/edit-profile", element: <EditProfile />},
  {path: "/checkout", element: <Checkout />},
  {path: "/payments", element: <PaymentPage />},
  {path: "/complete", element: <OrderComplete />},
  {path: "/order-detail", element: <OrderDetails />},
  {path: "/register-events/:eventId", element: <EventRegistration />},
  {path: "/cart", element: <Cart />},
];

export const adminRoutes: Array<PathRouteProps> = [
  {path: "dashboard", element: <Dashboard />},
  {path: "order", element: <Order />},
  {path: "detail-order", element: <DetailsOrder />},
  {path: "card", element: <Card />},
  {path: "edit-card/:id", element: <EditCard />},
  {path: "add-card", element: <AddCard />},
  {path: "special-card", element: <SpecialCard />},
  {path: "edit-special/:id", element: <EditSpecialCard />},
  {path: "add-special", element: <AddSpecialCard />},
  {path: "master", element: <Master />},
  {path: "series", element: <Series />},
  {path: "categories", element: <Categories />},
  {path: "tag", element: <Tag />},
  {path: "sign-in", element: <SignInPage />},
  {path: "sign-up", element: <SignUpPage />},
  {path: "home", element: <HomeSection />},
  {path: "marketplace", element: <MarketplaceForm />},
  {path: "rankings", element: <RankingsForm />},
  {path: "events", element: <EventsForm />},
  {path: "event", element: <Events />},
  {path: "edit-event/:id", element: <EditEvents />},
  {path: "add-event", element: <AddEvents />},
  {path: "coupon", element: <Coupon />},
  {path: "add-coupon", element: <AddCouponForm />},
  {path: "edit-coupon/:id", element: <EditCouponForm />},
  {path: "creator", element: <Creator />},
  {path: "member", element: <Member />},
  {path: "registered-user-event/:id", element: <RegisteredUsers />},
  {path: "add-member", element: <AddMember />},
  {path: "detail-member", element: <MemberDetails />},
  {path: "subscription", element: <Subscription />},
  {path: "shipping", element: <Shipping />},
  {path: "payment", element: <Payment />},
  {path: "admin", element: <Admin />},
  {path: "add-admin", element: <AddAdmin />},
  {path: "profile", element: <ProfileSettings />},
  {path: "edit-profile/:id", element: <EditProfileAdmin />},
  {path:"/cards/:productId/qr-codes", element:<QrCodesPage /> },
  {path:"/special-cards/:productId/qr-codes", element:<SpecialQrCodesPage /> },
  {path: "assign-requirement/:id", element: <AssignRequirement/>}


];
