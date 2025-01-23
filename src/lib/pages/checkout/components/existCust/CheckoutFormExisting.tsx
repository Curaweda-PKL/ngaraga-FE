import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoRadioButtonOn } from "react-icons/io5";
import DeliveryTab from "./DeliveryForm";
import PickupTab from "./PickupTab";

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
  pickUpTime: string;
}

interface Province {
  id: string;
  name: string;
}

interface City {
  id: string;
  province_id: string;
  name: string;
}

interface Subdistrict {
  id: string;
  regency_id: string;
  name: string;
}

const CheckoutExisting: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"delivery" | "pickup">("delivery");
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

  const handlePickUpTimeChange = (time: string) => {
    setFormData((prev) => ({ ...prev, pickUpTime: time }));
  };

  return (
    <div className="col-span-2">
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

      <div className="mt-10 space-y-4">
        <div className="flex gap-5 items-center mb-3">
          <button
            className={`btn ${
              selectedTab === "delivery"
                ? "bg-call-to-actions-100"
                : "bg-neutral-colors-200"
            } border rounded-lg`}
            onClick={() => setSelectedTab("delivery")}
          >
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
            Pick up
          </button>
        </div>

        {selectedTab === "delivery" ? (
          <DeliveryTab

          />
        ) : (
          <PickupTab
            pickUpTime={formData.pickUpTime}
            onPickUpTimeChange={handlePickUpTimeChange}
          />
        )}

        <div className="mt-8 mb-8">
          <h2 className="font-bold text-lg mb-4">Payment Method</h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              {
                method: "Bank BCA",
                image:
                  "https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-bca-bank-logo-png-image_6472275.png",
              },
              {
                method: "Bank BNI",
                image:
                  "https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-bca-bank-logo-png-image_6472275.png",
              },
              {
                method: "Bank BRI",
                image:
                  "https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-bca-bank-logo-png-image_6472275.png",
              },
              {
                method: "Qris",
                image:
                  "https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-bca-bank-logo-png-image_6472275.png",
              },
            ].map(({ method, image }) => (
              <label
                key={method}
                className={`flex justify-center items-center border rounded-lg p-3 cursor-pointer mb-16 ${
                  paymentMethod === method ? "border-call-to-actions-900" : ""
                }`}
              >
                <img
                  src={image}
                  alt={method}
                  className="w-16 h-16 mr-4 object-cover p-3"
                />
                <span className="flex-grow">{method}</span>
                <div className="relative flex flex-col items-end mb-10">
                  {paymentMethod === method && <IoRadioButtonOn />}
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

export default CheckoutExisting;