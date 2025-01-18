import {useState, ChangeEvent} from "react";

export const AddAdmin = () => {
  const [formData, setFormData] = useState({
    memberImage: null as string | ArrayBuffer | null,
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    access: {
      dashboard: false,
      orders: false,
      events: false,
      coupon: false,
      creator: false,
      member: false,
      subscription: false,
      shipping: false,
      payment: false,
      admin: false,
      marketplace: {
        card: false,
        specialCard: false,
        categories: false,
        tag: false,
      },
      pages: {
        signUp: false,
        signIn: false,
        home: false,
        marketplace: false,
        rankings: false,
        events: false,
      },
    },
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAccessChange = (
    section: keyof typeof formData.access,
    subsection?: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      access: subsection
        ? {
            ...prev.access,
            [section]: {
              ...(prev.access[section] as Record<string, boolean>),
              [subsection]: !(prev.access[section] as Record<string, boolean>)[
                subsection
              ],
            },
          }
        : {
            ...prev.access,
            [section]: !(prev.access[section] as boolean),
          },
    }));
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          memberImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span>Admin</span>
        <span>/</span>
        <span>Admin List</span>
        <span>/</span>
        <span className="text-gray-900">Add Admin</span>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Add Admin</h1>

      <div className="space-y-6 bg-white rounded-lg p-6">
        <div>
          <label className="block mb-2 text-sm">Member Image *</label>
          <div className="border-2 border-dashed border-yellow-500 rounded-lg p-8 text-center bg-yellow-50">
            <div className="space-y-4">
              <div className="flex justify-center">
                <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg">
                  Browse
                </button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
              <p className="text-sm text-gray-500">
                Click to Upload or Drag & Drop
              </p>
              <p className="text-xs text-gray-400">jpeg, jpg, png, max 4mb</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Username *</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Phone Number</label>
            <div className="flex">
              <select className="p-2 border rounded-l-lg border-r-0 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
                <option>+62</option>
              </select>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter Phone Number"
                className="w-full p-2 border rounded-r-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm">Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm">Access *</label>
          <div className="grid grid-cols-5 gap-4">
            {/* Main Access Options */}
            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.access.dashboard}
                  onChange={() => handleAccessChange("dashboard")}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Dashboard</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.access.orders}
                  onChange={() => handleAccessChange("orders")}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Orders</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.access.events}
                  onChange={() => handleAccessChange("events")}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Events</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.access.coupon}
                  onChange={() => handleAccessChange("coupon")}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Coupon</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.access.creator}
                  onChange={() => handleAccessChange("creator")}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Creator</span>
              </label>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.access.member}
                  onChange={() => handleAccessChange("member")}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Member</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.access.subscription}
                  onChange={() => handleAccessChange("subscription")}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Subscription</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.access.shipping}
                  onChange={() => handleAccessChange("shipping")}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Shipping</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.access.payment}
                  onChange={() => handleAccessChange("payment")}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Payment</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.access.admin}
                  onChange={() => handleAccessChange("admin")}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Admin</span>
              </label>
            </div>

            {/* Marketplace Section */}
            <div className="space-y-4">
              <div className="font-medium text-sm">Marketplace</div>
              <label className="flex items-center gap-2 pl-4">
                <input
                  type="checkbox"
                  checked={formData.access.marketplace.card}
                  onChange={() => handleAccessChange("marketplace", "card")}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Card</span>
              </label>
              <label className="flex items-center gap-2 pl-4">
                <input
                  type="checkbox"
                  checked={formData.access.marketplace.specialCard}
                  onChange={() =>
                    handleAccessChange("marketplace", "specialCard")
                  }
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Special Card</span>
              </label>
              <label className="flex items-center gap-2 pl-4">
                <input
                  type="checkbox"
                  checked={formData.access.marketplace.categories}
                  onChange={() =>
                    handleAccessChange("marketplace", "categories")
                  }
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Categories</span>
              </label>
              <label className="flex items-center gap-2 pl-4">
                <input
                  type="checkbox"
                  checked={formData.access.marketplace.tag}
                  onChange={() => handleAccessChange("marketplace", "tag")}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Tag</span>
              </label>
            </div>

            {/* Pages Section */}
            <div className="space-y-4">
              <div className="font-medium text-sm">Pages</div>
              <label className="flex items-center gap-2 pl-4">
                <input
                  type="checkbox"
                  checked={formData.access.pages.signUp}
                  onChange={() => handleAccessChange("pages", "signUp")}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Sign Up</span>
              </label>
              <label className="flex items-center gap-2 pl-4">
                <input
                  type="checkbox"
                  checked={formData.access.pages.signIn}
                  onChange={() => handleAccessChange("pages", "signIn")}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Sign In</span>
              </label>
              <label className="flex items-center gap-2 pl-4">
                <input
                  type="checkbox"
                  checked={formData.access.pages.home}
                  onChange={() => handleAccessChange("pages", "home")}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Home</span>
              </label>
              <label className="flex items-center gap-2 pl-4">
                <input
                  type="checkbox"
                  checked={formData.access.pages.marketplace}
                  onChange={() => handleAccessChange("pages", "marketplace")}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Marketplace</span>
              </label>
              <label className="flex items-center gap-2 pl-4">
                <input
                  type="checkbox"
                  checked={formData.access.pages.rankings}
                  onChange={() => handleAccessChange("pages", "rankings")}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Rankings</span>
              </label>
              <label className="flex items-center gap-2 pl-4">
                <input
                  type="checkbox"
                  checked={formData.access.pages.events}
                  onChange={() => handleAccessChange("pages", "events")}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Events</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button className="px-6 py-2 border rounded-lg hover:bg-gray-50">
          Cancel
        </button>
        <button className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
          Save
        </button>
      </div>
    </div>
  );
};
