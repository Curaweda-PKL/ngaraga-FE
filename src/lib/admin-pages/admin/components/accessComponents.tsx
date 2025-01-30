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
  permissionKey?: string;
  submenu?: {
    id: string;
    label: string;
    icon: JSX.Element;
    permissionKey: string;
  }[];
};

type AccessComponentsProps = {
  selectedPermissions: string[];
  onPermissionChange: (permissionKey: string, isChecked: boolean) => void;
};

const buttons: Button[] = [
  {
    id: "toggle-button-1",
    label: "Dashboard",
    icon: <DashboardIcons />,
    permissionKey: "CMS_DASHBOARD",
  },
  {
    id: "toggle-button-2",
    label: "Orders",
    icon: <DashboardIcons />,
    permissionKey: "CMS_ORDERS",
  },
  {
    id: "toggle-button-3",
    label: "Events",
    icon: <DashboardIcons />,
    permissionKey: "CMS_EVENTS",
  },
  {
    id: "toggle-button-4",
    label: "Coupons",
    icon: <CouponIcons />,
    permissionKey: "CMS_COUPON",
  },
  {
    id: "toggle-button-5",
    label: "Creators",
    icon: <CreatorIcons />,
    permissionKey: "CMS_CREATOR",
  },
  {
    id: "toggle-button-6",
    label: "Members",
    icon: <MemberIcons />,
    permissionKey: "CMS_MEMBER",
  },
  {
    id: "toggle-button-7",
    label: "Subscriptions",
    icon: <SubsIcons />,
    permissionKey: "CMS_SUBSCRIBE",
  },
  {
    id: "toggle-button-8",
    label: "Shipping",
    icon: <ShippingIcons />,
    permissionKey: "CMS_SHIPPING",
  },
  {
    id: "toggle-button-9",
    label: "Payments",
    icon: <PayIcons />,
    permissionKey: "CMS_PAYMENT",
  },
  {
    id: "toggle-button-10",
    label: "Admin",
    icon: <AdminIcons />,
    permissionKey: "CMS_ADMIN",
  },
  {
    id: "toggle-button-11",
    label: "Marketplace",
    icon: <MarketIcons />,
    permissionKey: "CMS_MARKETPLACE",
    submenu: [
      {
        id: "marketplace-card",
        label: "Card",
        icon: <LineIcons />,
        permissionKey: "CMS_CARD",
      },
      {
        id: "marketplace-special-card",
        label: "Special Card",
        icon: <LineIcons />,
        permissionKey: "CMS_SPECIALCARDS",
      },
      {
        id: "marketplace-categories",
        label: "Categories",
        icon: <LineIcons />,
        permissionKey: "CMS_CATEGORIES",
      },
      {
        id: "marketplace-series",
        label: "Series",
        icon: <LineIcons />,
        permissionKey: "CMS_SERIES",
      },
      {
        id: "marketplace-master",
        label: "Master",
        icon: <LineIcons />,
        permissionKey: "CMS_MASTER",
      },
      {
        id: "marketplace-tag",
        label: "Tag",
        icon: <LineIcons />,
        permissionKey: "CMS_TAGS",
      },
    ],
  },
  {
    id: "toggle-button-12",
    label: "Pages",
    icon: <PageIcons />,
    permissionKey: "CMS_PAGES",
    submenu: [
      {
        id: "pages-sign-up",
        label: "Sign Up",
        icon: <LineIcons />,
        permissionKey: "CMS_SIGNUP",
      },
      {
        id: "pages-sign-in",
        label: "Sign In",
        icon: <LineIcons />,
        permissionKey: "CMS_SIGNIN",
      },
      {
        id: "pages-home",
        label: "Home",
        icon: <LineIcons />,
        permissionKey: "CMS_HOME",
      },
      {
        id: "pages-marketplace",
        label: "Marketplace",
        icon: <LineIcons />,
        permissionKey: "CMS_MARKETPLACE_PAGES",
      },
      {
        id: "pages-rankings",
        label: "Rankings",
        icon: <LineIcons />,
        permissionKey: "CMS_RANKINGS",
      },
      {
        id: "pages-events",
        label: "Events",
        icon: <LineIcons />,
        permissionKey: "CMS_PAGES_EVENTS",
      },
    ],
  },
];


export const AccessComponents = ({
  selectedPermissions,
  onPermissionChange,
}: AccessComponentsProps) => {
  return (
    <div className="flex flex-col p-6">
      <div className="acces-header -ml-2 font-semibold ">
        <h1>Access *</h1>
      </div>
      <div className="grid grid-cols-5 -ml-2 gap-4">
        {buttons.map((button) => (
          <div key={button.id} className="mt-2">
            {/* Main Button */}
            <input
              type="checkbox"
              id={button.id}
              className="hidden"
              checked={selectedPermissions.includes(button.permissionKey || '')}
              onChange={(e) => 
                button.permissionKey && 
                onPermissionChange(button.permissionKey, e.target.checked)
              }
            />
            <label
              htmlFor={button.id}
              className={`rounded-lg px-4 py-2 cursor-pointer flex items-center gap-2 ${
                selectedPermissions.includes(button.permissionKey || '')
                  ? 'border-2 border-cta-900 bg-cta-100 text-cta-900'
                  : 'bg-whitey text-neutral-500'
              }`}
            >
              {button.icon}
              <p>{button.label}</p>
              {/* ... icon and label ... */}
            </label>

            {/* Submenu Items */}
            <div className="ml-4">
              {button.submenu?.map((submenu) => (
                <div key={submenu.id} className="mt-2">
                  <input
                    type="checkbox"
                    id={submenu.id}
                    className="hidden"
                    checked={selectedPermissions.includes(submenu.permissionKey)}
                    onChange={(e) => 
                      onPermissionChange(submenu.permissionKey, e.target.checked)
                    }
                  />
                  <label
                    htmlFor={submenu.id}
                    className={`rounded-lg px-4 py-2 cursor-pointer flex items-center gap-2 ${
                      selectedPermissions.includes(submenu.permissionKey)
                        ? 'border-2 border-cta-900 bg-cta-100 text-cta-900'
                        : 'bg-whitey text-neutral-500'
                    }`}
                  >
                    {submenu.icon}
                    <p>{submenu.label}</p>
                    {/* ... submenu icon and label ... */}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
