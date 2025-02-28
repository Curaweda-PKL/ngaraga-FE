import React, {useState, useEffect} from "react";
import {IoRadioButtonOn} from "react-icons/io5";
import {TbTruckDelivery} from "react-icons/tb";
import {PiPackageLight} from "react-icons/pi";
import axios from "axios";
import DeliveryForm from "./newCust/DeliveryForm";
import PickupForm from "./newCust/PickupForm";

export interface FormData {
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
  pickUpTime: string;
}

export interface Province {
  id: string;
  name: string;
}

export interface City {
  id: string;
  province_id: string;
  name: string;
}

export interface Subdistrict {
  id: string;
  regency_id: string;
  name: string;
}

export interface DeliveryOption {
  id: string;
  name: string;
  logo: string;
  estimatedDelivery: string;
  price: number;
}

const CheckoutForm: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"delivery" | "pickup">(
    "delivery"
  );
  const [paymentMethod, setPaymentMethod] = useState<string>("Bank BCA");
  const [selectedDelivery, setSelectedDelivery] = useState<string>("Anter Aja");
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneCode: "+62",
    phoneNumber: "",
    country: "Indonesia",
    state: "",
    city: "",
    subdistrict: "",
    postalCode: "",
    addressDetails: "",
    notes: "",
    pickUpTime: "",
  });

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [subdistricts, setSubdistricts] = useState<Subdistrict[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const availablePickUpTimes = ["08:00", "10:00", "13:00", "14:00", "15:00"];

  const deliveryOptions: DeliveryOption[] = [
    {
      id: "anteraja",
      name: "Anter Aja",
      logo: "https://anteraja.id/assets/images/logo-aj.svg",
      estimatedDelivery: "3-4 Days",
      price: 15000,
    },
    {
      id: "idexpress",
      name: "ID Express",
      logo: "https://idexpress.com/assets/img/logo.png",
      estimatedDelivery: "3-4 Days",
      price: 15000,
    },
    {
      id: "jne",
      name: "JNE",
      logo: "https://www.jne.co.id/frontend/images/logo.png",
      estimatedDelivery: "3-4 Days",
      price: 15000,
    },
  ];

  const paymentOptions = [
    {id: 1, name: "Bank BCA", logo: "/bca-logo.png"},
    {id: 2, name: "Bank BNI", logo: "/bni-logo.png"},
    {id: 3, name: "Bank BRI", logo: "/bri-logo.png"},
    {id: 4, name: "Qris", logo: "/qris-logo.png"},
  ];

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get<Province[]>(
          "https://curaweda-pkl.github.io/api-wilayah-indonesia/api/provinces.json"
        );
        setProvinces(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching provinces:", err);
        setError("Failed to load provinces");
        setLoading(false);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (formData.state) {
        try {
          const response = await axios.get<City[]>(
            `https://curaweda-pkl.github.io/api-wilayah-indonesia/api/regencies/${formData.state}.json`
          );
          setCities(response.data);
        } catch (err) {
          console.error("Error fetching cities:", err);
        }
      }
    };
    fetchCities();
  }, [formData.state]);

  useEffect(() => {
    const fetchSubdistricts = async () => {
      if (formData.city) {
        try {
          const response = await axios.get<Subdistrict[]>(
            `https://curaweda-pkl.github.io/api-wilayah-indonesia/api/districts/${formData.city}.json`
          );
          setSubdistricts(response.data);
        } catch (err) {
          console.error("Error fetching subdistricts:", err);
        }
      }
    };
    fetchSubdistricts();
  }, [formData.city]);

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handlePickUpTimeChange = (time: string) => {
    setFormData((prev) => ({...prev, pickUpTime: time}));
  };

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString("id-ID")}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="checkout-header py-4">
        <h1 className="font-bold text-xl sm:text-2xl mb-2">Checkout</h1>
        {/* Progress indicator can be added here */}
      </div>

      <div className="mt-4 sm:mt-6 space-y-4">
        {/* Delivery/Pickup Tab */}
        <div className="flex gap-3 sm:gap-5 items-center mb-4 sm:mb-8">
          <button
            className={`flex items-center gap-2 py-2 px-3 sm:py-3 sm:px-4 text-sm sm:text-base ${
              selectedTab === "delivery"
                ? "bg-call-to-actions-100 text-call-to-actions-900"
                : "bg-neutral-colors-200"
            } border rounded-lg transition-colors`}
            onClick={() => setSelectedTab("delivery")}
          >
            <TbTruckDelivery className="text-lg sm:text-xl" />
            <span>Delivery</span>
          </button>
          <button
            className={`flex items-center gap-2 py-2 px-3 sm:py-3 sm:px-4 text-sm sm:text-base ${
              selectedTab === "pickup"
                ? "bg-call-to-actions-100 text-call-to-actions-900"
                : "bg-neutral-colors-200"
            } border rounded-lg transition-colors`}
            onClick={() => setSelectedTab("pickup")}
          >
            <PiPackageLight className="text-lg sm:text-xl" />
            <span>Pick up</span>
          </button>
        </div>

        {/* Delivery Options Section */}
        {selectedTab === "delivery" && (
          <div className="mb-6">
            <h2 className="font-bold text-base sm:text-lg mb-3">
              Delivery Options
            </h2>
            <div className="space-y-3">
              {deliveryOptions.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-center p-3 sm:p-4 border rounded-lg cursor-pointer
                    ${
                      selectedDelivery === option.name
                        ? "border-call-to-actions-900 bg-call-to-actions-50"
                        : "border-gray-200"
                    }`}
                  onClick={() => setSelectedDelivery(option.name)}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden mr-3">
                    <img
                      src={option.logo}
                      alt={option.name}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium">{option.name}</div>
                    <div className="text-sm text-gray-500">
                      Estimated Delivery: {option.estimatedDelivery}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {formatCurrency(option.price)}
                    </div>
                    {selectedDelivery === option.name && (
                      <div className="text-call-to-actions-900 ml-auto">
                        <IoRadioButtonOn size={18} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Sections */}
        {selectedTab === "delivery" ? (
          <DeliveryForm
            formData={formData}
            handleFormChange={handleFormChange}
            provinces={provinces}
            cities={cities}
            subdistricts={subdistricts}
            loading={loading}
            error={error}
          />
        ) : (
          <PickupForm
            formData={formData}
            handleFormChange={handleFormChange}
            handlePickUpTimeChange={handlePickUpTimeChange}
            availablePickUpTimes={availablePickUpTimes}
          />
        )}

        {/* Payment Method Section */}
        <div className="w-full max-w-4xl mx-auto">
          <h2 className="font-medium text-gray-700 mb-3">Payment Method</h2>
          {/* Desktop/Tablet View - 2x2 Grid */}
          <div className="hidden sm:grid grid-cols-2 gap-4">
            {paymentOptions.map((method) => (
              <div
                key={method.id}
                className={`flex items-center p-4 border rounded-lg cursor-pointer
              ${
                paymentMethod === method.name
                  ? "border-yellow-400 bg-yellow-50"
                  : "border-gray-200"
              }`}
                onClick={() => setPaymentMethod(method.name)}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden mr-3">
                  <img
                    src={method.logo}
                    alt={method.name}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="flex-grow">
                  <div className="font-medium">{method.name}</div>
                </div>
                {paymentMethod === method.name && (
                  <div className="text-yellow-500 ml-auto">
                    <IoRadioButtonOn size={18} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile View - Stacked List */}
          <div className="sm:hidden space-y-3">
            {paymentOptions.map((method) => (
              <div
                key={method.id}
                className={`flex items-center p-3 border rounded-lg cursor-pointer
              ${
                paymentMethod === method.name
                  ? "border-yellow-400 bg-yellow-50"
                  : "border-gray-200"
              }`}
                onClick={() => setPaymentMethod(method.name)}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden mr-3">
                  <img
                    src={method.logo}
                    alt={method.name}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="flex-grow">
                  <div className="font-medium">{method.name}</div>
                </div>
                {paymentMethod === method.name && (
                  <div className="text-yellow-500 ml-auto">
                    <IoRadioButtonOn size={18} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-8">
          <button className="w-full bg-call-to-actions-900 text-white py-3 rounded-lg font-medium hover:bg-call-to-actions-800 transition-colors">
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
