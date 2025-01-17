import React from "react";
import {AiOutlineUser} from "react-icons/ai";
import {MdOutlineMail} from "react-icons/md";

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

interface CheckoutFormProps {
  deliveryOption: string;
  setDeliveryOption: (option: string) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  formData: FormData;
  handleFormChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  deliveryOption,
  setDeliveryOption,
  paymentMethod,
  setPaymentMethod,
  formData,
  handleFormChange,
}) => {
  return (
    <div>
      <div className="checkout-header">
        <h1 className="font-bold text-2xl mb-2">Checkout</h1>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-call-to-actions-900 rounded-lg text-white flex items-center justify-center mt-2">
            <span className="text-white font-bold">1</span>
          </div>
          <span className="text-yellow-500 text-lg text-center mx-4">
            Information
          </span>
        </div>
      </div>

      <div className="space-y-4 mt-10">
        {/* Form Fields */}
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
        {/* Add remaining form fields here */}
      </div>

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
  );
};

export default CheckoutForm;
