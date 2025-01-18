import React, {useState} from "react";
import {AiOutlineUser} from "react-icons/ai";
import {MdOutlineMail} from "react-icons/md";
import {PiPackageLight} from "react-icons/pi";
import {TbTruckDelivery} from "react-icons/tb";
import PhoneInput from "./components/PhoneInput";

interface Item {
  title: string;
  image: string;
  quantity: number;
  price: number;
  author: string;
}

interface FormData {
  fullName: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  subdistrict: string;
  postalCode: string;
  addressDetails: string;
  notes: string;
}

const items: Item[] = [
  {
    title: "Dancing Robot 0512",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqGUVku_G28P1qOvkCPizeyntIbBri9GMSVw&s",
    quantity: 1,
    price: 200000,
    author: "Orbitian",
  },
  {
    title: "Space Explorer 9000",
    image:
      "https://c4.wallpaperflare.com/wallpaper/251/380/59/1920x1080-px-album-covers-led-zeppelin-music-motorcycles-honda-hd-art-wallpaper-preview.jpg",
    quantity: 2,
    price: 150000,
    author: "Galactica",
  },
];

const Checkout: React.FC = () => {
  const [deliveryOption, setDeliveryOption] = useState<string>("Anter Aja");
  const [paymentMethod, setPaymentMethod] = useState<string>("Bank BCA");
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneCode: "+62",
    phoneNumber: "",
    country: "Indonesia",
    state: "State/Province",
    city: "City/Regency",
    subdistrict: "Subdistrict",
    postalCode: "",
    addressDetails: "",
    notes: "",
  });

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const formatCurrency = (value: number): string =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCost = 15000;
  const vat = subtotal * 0.11;
  const total = subtotal + shippingCost + vat;

  return (
    <div className="checkout-container px-14 mt-5 grid grid-cols-3 gap-10">
      {/* Left Section */}
      <div className="col-span-2">
        {/* Header */}
        <div className="checkout-header">
          <h1 className="font-bold text-2xl mb-2">Checkout</h1>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-call-to-actions-900 rounded-lg text-white flex items-center justify-center mt-2">
              <span className="text-white font-bold">1</span>
            </div>
            <span className="text-yellow-500 text-md text-center mx-4">
              Information
            </span>

            <div className="w-8 h-8 border border-gray-500 rounded-lg flex items-center justify-center mt-2 mx-4">
              <span className="text-gray-500 font-bold">2</span>
            </div>
            <span className="text-gray-500 text-md text-center mx-1">
              Payment
            </span>

            <div className="w-8 h-8 border border-gray-500 rounded-lg flex items-center justify-center mt-2 mx-4">
              <span className="text-gray-500 font-bold">3</span>
            </div>
            <span className="text-gray-500 text-md text-center mx-2">
              Complete Orders
            </span>
          </div>
        </div>

        {/* Information Form */}
        <div className="mt-10 space-y-4 ">
          <div className="flex gap-5 items-center mb-3">
            <button className="btn bg-call-to-actions-100 border border-call-to-actions-900 rounded-lg hover:bg-white text-call-to-actions-900 ">
              <TbTruckDelivery size={18} />
              Delivery
            </button>

            <button className="btn bg-neutral-colors-200 border border-neutral-colors-500 rounded-lg hover:bg-call-to-actions-100 text-neutral-colors-500">
              <PiPackageLight size={18} />
              Pick up
            </button>
          </div>

          <div className="relative w-full mb-4">
            <AiOutlineUser
              className="absolute text-neutral-colors-500 left-3 top-1/2 transform -translate-y-1/2"
              size={23}
            />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleFormChange}
              placeholder="Full Name"
              className="w-full border border-neutral-colors-500 rounded-lg p-3 pl-11"
            />
          </div>

          <div className="relative w-full mb-4">
            <MdOutlineMail
              className="absolute text-neutral-colors-500 left-3 top-1/2 transform -translate-y-1/2"
              size={23}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              placeholder="Email"
              className="w-full border border-neutral-colors-500 rounded-lg p-3 pl-11"
            />
          </div>

          <div className="flex ">
            <PhoneInput />
          </div>

          <select
            name="country"
            value={formData.country}
            onChange={handleFormChange}
            className="w-full border border-neutral-colors-500  rounded-lg p-3"
          >
            <option value="Indonesia">Indonesia</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <select
              name="state"
              value={formData.state}
              onChange={handleFormChange}
              className="border border-neutral-colors-500  rounded-lg p-3"
            >
              <option value="State/Province">State/Province</option>
            </select>
            <select
              name="city"
              value={formData.city}
              onChange={handleFormChange}
              className="border border-neutral-colors-500  rounded-lg p-3"
            >
              <option value="City/Regency">City/Regency</option>
            </select>
            <select
              name="subdistrict"
              value={formData.subdistrict}
              onChange={handleFormChange}
              className="border border-neutral-colors-500  rounded-lg p-3"
            >
              <option value="Subdistrict">Subdistrict</option>
            </select>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleFormChange}
              placeholder="Postal Code"
              className="border border-neutral-colors-500  rounded-lg p-3"
            />
          </div>
          <textarea
            name="addressDetails"
            value={formData.addressDetails}
            onChange={handleFormChange}
            placeholder="Address Details"
            className="w-full border border-neutral-colors-500  rounded-lg p-3"
          ></textarea>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleFormChange}
            placeholder="Notes (Optional)"
            className="w-full border border-neutral-colors-500  rounded-lg p-3"
          ></textarea>
        </div>

        {/* Delivery Options */}
        <div className="mt-8">
          <h2 className="font-bold text-lg mb-4">Delivery Options</h2>
          <div className="space-y-4">
            {["Anter Aja", "ID Express", "JNE"].map((option) => (
              <label
                key={option}
                className={`flex justify-between items-center border rounded-lg p-3 cursor-pointer ${
                  deliveryOption === option ? "border-yellow-500" : ""
                }`}
              >
                <span>{option}</span>
                <span>Rp 15.000</span>
                <input
                  type="radio"
                  name="delivery"
                  value={option}
                  checked={deliveryOption === option}
                  onChange={() => setDeliveryOption(option)}
                  className="hidden"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="mt-8">
          <h2 className="font-bold text-lg mb-4">Payment Method</h2>
          <div className="grid grid-cols-4 gap-4">
            {["Bank BCA", "Bank BNI", "Bank BRI", "Qris"].map((method) => (
              <label
                key={method}
                className={`flex justify-center items-center border rounded-lg p-3 cursor-pointer ${
                  paymentMethod === method ? "border-yellow-500" : ""
                }`}
              >
                {method}
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                  className="hidden"
                />
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col p-6 rounded-lg max-h-fit border border-neutral-colors-400 bg-neutral-colors-200 lg:mt-20">
        <h2 className="font-bold text-lg mb-2">Summary Order</h2>
        <div className="border-b border-neutral-colors-400 mb-5"></div>

        {/* Product List */}
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border pb-4 bg-neutral-colors-100 border-neutral-colors-300 rounded-lg mb-4"
          >
            <div className="flex items-center bg-neutral-colors-100 p-2 rounded-lg border-neutral-colors-300">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-contain rounded-lg mr-4 -mb-2"
              />
              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p>
                  <span>{item.author}</span>
                </p>
                <p>
                  <span>Qty: {item.quantity}</span>
                  <span className="ml-4 font-bold">
                    {formatCurrency(item.price)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-6 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{formatCurrency(shippingCost)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>Rp 0</span>
          </div>
          <div className="flex justify-between border-b border-neutral-colors-400 pb-2">
            <span>VAT 11%</span>
            <span>{formatCurrency(vat)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
        <a href="/payment">
          <button className="w-full bg-call-to-actions-900 text-white rounded-lg py-3 mt-6 font-bold hover:bg-call-to-actions-800">
            Pay Now
          </button>
        </a>
      </div>
    </div>
  );
};

export default Checkout;