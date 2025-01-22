import { AdminIcons } from "../svgsIcons/adminIcons";
import { CouponIcons } from "../svgsIcons/couponIcons";
import { CreatorIcons } from "../svgsIcons/creatorIcons";
import DashboardIcons from "../svgsIcons/dashboardIcons";
import { LineIcons } from "../svgsIcons/lineIcons";
import { MarketIcons } from "../svgsIcons/marketIcons";
import { MemberIcons } from "../svgsIcons/memberIcons";
import { PageIcons } from "../svgsIcons/pagesIcons";
import { PayIcons } from "../svgsIcons/payIcons";
import { ShippingIcons } from "../svgsIcons/shipIcons";
import { SubsIcons } from "../svgsIcons/subsIcons";

  type Button = {
    id: string;
    label: string;
    icon: JSX.Element;
    submenu?: { id: string; label: string; icon: JSX.Element }[];
  };

  const buttons: Button[] = [
    { id: "toggle-button-1", label: "Dashboard", icon: <DashboardIcons /> },
    { id: "toggle-button-2", label: "Orders", icon: <DashboardIcons /> },
    { id: "toggle-button-3", label: "Events", icon: <DashboardIcons /> },
    { id: "toggle-button-4", label: "Coupons", icon: <CouponIcons /> },
    { id: "toggle-button-5", label: "Creators", icon: <CreatorIcons /> },
    { id: "toggle-button-6", label: "Members", icon: <MemberIcons /> },
    { id: "toggle-button-7", label: "Subscriptions", icon: <SubsIcons /> },
    { id: "toggle-button-8", label: "Shipping", icon: <ShippingIcons /> },
    { id: "toggle-button-9", label: "Payments", icon: <PayIcons /> },
    { id: "toggle-button-10", label: "Admin", icon: <AdminIcons /> },
    {
      id: "toggle-button-11",
      label: "Marketplace",
      icon: <MarketIcons />,
      submenu: [
        { id: "marketplace-card", label: "Card", icon: <LineIcons /> },
        {
          id: "marketplace-special-card",
          label: "Special Card",
          icon: <LineIcons />,
        },
        {
          id: "marketplace-categories",
          label: "Categories",
          icon: <LineIcons />,
        },
        { id: "marketplace-tag", label: "Tag", icon: <LineIcons /> },
      ],
    },
    {
      id: "toggle-button-12",
      label: "Pages",
      icon: <PageIcons />,
      submenu: [
        { id: "pages-sign-up", label: "Sign Up", icon: <LineIcons /> },
        { id: "pages-sign-in", label: "Sign In", icon: <LineIcons /> },
        { id: "pages-home", label: "Home", icon: <LineIcons /> },
        { id: "pages-marketplace", label: "Marketplace", icon: <LineIcons /> },
        { id: "pages-rankings", label: "Rankings", icon: <LineIcons /> },
        { id: "pages-events", label: "Events", icon: <LineIcons /> },
      ],
    },
  ];

export const AccessComponents = () => {
    return(
        <div className="flex flex-col p-6">
        <div className="acces-header -ml-6 font-semibold ">
          <h1>Access *</h1>
        </div>

        <div className="grid grid-cols-5 -ml-2 gap-4">
          {buttons.map((button) => (
            <div key={button.id} className="mt-2">
              {/* Main Button */}
              <input type="checkbox" id={button.id} className="hidden" />
              <label
                htmlFor={button.id}
                className="rounded-lg px-4 py-2 cursor-pointer flex items-center gap-2"
              >
                {button.icon}
                <p>{button.label}</p>
              </label>

              {/* Submenu Items */}
              <div className="ml-4 ">
                {button.submenu?.map((submenu) => (
                  <div key={submenu.id} className="mt-2">
                    <input
                      type="checkbox"
                      id={submenu.id}
                      className="hidden"
                    />
                    <label
                      htmlFor={submenu.id}
                      className="rounded-lg px-4 py-2 cursor-pointer flex items-center gap-2"
                    >
                      {submenu.icon}
                      <p>{submenu.label}</p>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )

}