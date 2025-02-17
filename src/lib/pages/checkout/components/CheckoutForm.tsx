import React, { useState, useEffect } from "react";
import { IoRadioButtonOn } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { PiPackageLight } from "react-icons/pi";
import axios from "axios";
import DeliveryForm from "./DeliveryForm";
import PickupForm from "./PickupForm";

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

const CheckoutForm: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"delivery" | "pickup">(
    "delivery"
  );
  const [paymentMethod, setPaymentMethod] = useState<string>("Bank BCA");
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePickUpTimeChange = (time: string) => {
    setFormData((prev) => ({ ...prev, pickUpTime: time }));
  };

  return (
    <div className="col-span-2">
      <div className="checkout-header">
        <h1 className="font-bold text-2xl mb-2">Checkout</h1>
        {/* Progress indicator remains same */}
      </div>

      <div className="mt-10 space-y-4">
        <div className="flex gap-5 items-center mb-8">
          <button
            className={`btn ${
              selectedTab === "delivery"
                ? "bg-call-to-actions-100"
                : "bg-neutral-colors-200"
            } border rounded-lg`}
            onClick={() => setSelectedTab("delivery")}
          >
            <TbTruckDelivery size={18} />
            Delivery
          </button>
          <button
            className={`btn ${
              selectedTab === "pickup"
                ? "bg-call-to-actions-100"
                : "bg-neutral-colors-200"
            } border rounded-lg`}
            onClick={() => setSelectedTab("pickup")}
          >
            <PiPackageLight size={18} />
            Pick up
          </button>
        </div>

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
        <div className="mt-8 mb-8">
          <h2 className="font-bold text-lg mb-4">Payment Method</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["Bank BCA", "Bank BNI", "Bank BRI", "Qris"].map((method) => (
              <label
                key={method}
                className={`flex justify-center items-center border rounded-lg p-3 cursor-pointer mb-4 ${
                  paymentMethod === method ? "border-call-to-actions-900" : ""
                }`}
              >
                <img
                  src="https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-bca-bank-logo-png-image_6472275.png"
                  alt={method}
                  className="w-16 h-16 mr-4 object-cover p-3"
                />
                <span className="flex-grow">{method}</span>
                <div className="relative flex flex-col items-end mb-10">
                  {paymentMethod === method && (
                    <IoRadioButtonOn className="text-xl" />
                  )}
                </div>
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
    </div>
  );
};

export default CheckoutForm;
