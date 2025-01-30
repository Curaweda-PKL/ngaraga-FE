export const CMS_PERMISSIONS = {
    DASHBOARD: 'CMS_DASHBOARD',
    ORDERS: 'CMS_ORDERS',
    MARKETPLACE: 'CMS_MARKETPLACE',
    CARD: 'CMS_CARD',
    SPECIAL_CARDS: 'CMS_SPECIALCARDS',
    MASTER: 'CMS_MASTER',
    CATEGORIES: 'CMS_CATEGORIES',
    TAGS: 'CMS_TAGS',
    PAGES: 'CMS_PAGES',
    SIGNIN: 'CMS_SIGNIN',
    SIGNUP: 'CMS_SIGNUP',
    HOME: 'CMS_HOME',
    MARKETPLACE_PAGES: 'CMS_MARKETPLACE_PAGES',
    RANKINGS: 'CMS_RANKINGS',
    EVENTS: 'CMS_EVENTS',
    COUPON: 'CMS_COUPON',
    CREATOR: 'CMS_CREATOR',
    MEMBER: 'CMS_MEMBER',
    SUBSCRIBE: 'CMS_SUBSCRIBE',
    ADMIN: 'CMS_ADMIN',
  };
  
  export const SIDEBAR_STRUCTURE = [
    {
      type: 'item',
      name: 'Dashboard',
      icon: <FaHome />,
      path: '/admin/dashboard',
      permission: CMS_PERMISSIONS.DASHBOARD,
    },
    {
      type: 'item',
      name: 'Orders',
      icon: <FaClipboardList />,
      path: '/admin/order',
      permission: CMS_PERMISSIONS.ORDERS,
    },
    {
      type: 'dropdown',
      name: 'Marketplace',
      icon: <FaShoppingCart />,
      permission: CMS_PERMISSIONS.MARKETPLACE,
      items: [
        { name: 'Card', permission: CMS_PERMISSIONS.CARD },
        { name: 'Special Card', permission: CMS_PERMISSIONS.SPECIAL_CARDS },
        { name: 'Master', permission: CMS_PERMISSIONS.MASTER },
        { name: 'Categories', permission: CMS_PERMISSIONS.CATEGORIES },
        { name: 'Tag', permission: CMS_PERMISSIONS.TAGS },
      ],
    },
    // Add other menu items following the same structure
  ];