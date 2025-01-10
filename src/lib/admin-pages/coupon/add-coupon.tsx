import {useState} from "react";

export const AddCouponForm = () => {
  const [formData, setFormData] = useState({
    couponName: "",
    couponCode: "",
    userType: "",
    applyTo: "",
    dateType: "",
    condition: "",
    couponTotal: "",
  });

  const generateCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setFormData({...formData, couponCode: code});
  };

  const handleSubmit = (e: {preventDefault: () => void}) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-sm text-gray-500 mb-4">
        Coupon / Coupon List / Add Coupon
      </div>

      <h1 className="text-2xl font-semibold mb-6">Add Coupon</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="space-y-4 p-6 bg-white rounded-lg shadow">
          <div>
            <label className="block mb-2">
              Coupon Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={formData.couponName}
              onChange={(e) =>
                setFormData({...formData, couponName: e.target.value})
              }
            />
          </div>

          <div>
            <label className="block mb-2">
              Coupon Code <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 p-2 border rounded-lg"
                value={formData.couponCode}
                onChange={(e) =>
                  setFormData({...formData, couponCode: e.target.value})
                }
              />
              <button
                type="button"
                onClick={generateCode}
                className="px-4 py-2 bg-yellow-400 text-yellow-800 rounded-lg hover:bg-yellow-500"
              >
                Generate Code
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-2">
              Apply Discount To <span className="text-red-500">*</span>
            </label>
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="applyTo"
                  className="form-radio"
                />
                <span className="ml-2">All Product</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="applyTo"
                  className="form-radio"
                />
                <span className="ml-2">Product Categories</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="applyTo"
                  className="form-radio"
                />
                <span className="ml-2">Product List</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-2">
              Apply Discount To <span className="text-red-500">*</span>
            </label>
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="dateType"
                  className="form-radio"
                />
                <span className="ml-2">Start and End Date</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="dateType"
                  className="form-radio"
                />
                <span className="ml-2">Unlimited</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-2">
              Condition <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="condition"
                  className="form-radio"
                />
                <span className="ml-2">Discount Rp</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="condition"
                  className="form-radio"
                />
                <span className="ml-2">Discount %</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="condition"
                  className="form-radio"
                />
                <span className="ml-2">Minimum Spent, Discount Rp</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="condition"
                  className="form-radio"
                />
                <span className="ml-2">Minimum Spent, Discount %</span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-6 bg-white rounded-lg shadow">
            <label className="block mb-2">
              User <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  className="form-radio"
                  value="guest"
                />
                <span className="ml-2">Guest</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  className="form-radio"
                  value="member"
                />
                <span className="ml-2">Member</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  className="form-radio"
                  value="newMember"
                />
                <span className="ml-2">New Member</span>
              </label>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <label className="block mb-2">
              Coupon Total <span className="text-red-500">*</span>
            </label>
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="couponTotal"
                  className="form-radio"
                  value="setQuantity"
                />
                <span className="ml-2">Set Quantity</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="couponTotal"
                  className="form-radio"
                  value="unlimited"
                />
                <span className="ml-2">Unlimited</span>
              </label>
            </div>
          </div>
        </div>
      </form>

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
