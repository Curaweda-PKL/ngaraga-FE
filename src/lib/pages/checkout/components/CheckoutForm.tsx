import React, { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";
import { PiPackageLight } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import PhoneInput from "./PhoneInput";
import axios from "axios";
import { IoRadioButtonOn } from "react-icons/io5";


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
  
const CheckoutForm:React.FC = () => {

    const [deliveryOption, setDeliveryOption] = useState<string>("Anter Aja");
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
  
    const handleFormChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
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
            typeof="text"
            name="country"
            value={formData.country}
            onChange={handleFormChange}
            className="w-full border border-neutral-colors-500  rounded-lg p-3"
          >
            <option value="Indonesia">Indonesia</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              {loading ? (
                <p>Loading provinces...</p>
              ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
              ) : (
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleFormChange}
                  className="border border-neutral-colors-500 rounded-lg p-3 w-full z-10"
                >
                  <option value="">State/Province</option>
                  {provinces.map((province) => {
                    console.log("Rendering province:", province);
                    return (
                      <option key={province.id} value={province.id}>
                        {province.name}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>

            <div>
              {loading ? (
                <p>Loading City...</p>
              ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
              ) : (
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleFormChange}
                  className="border border-neutral-colors-500 rounded-lg p-3 w-full z-10"
                  disabled={cities.length === 0}
                >
                  <option value="">City/Regency</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              {loading ? (
                <p>Loading Subdistrict...</p>
              ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
              ) : (
                <select
                  name="subdistrict"
                  value={formData.subdistrict}
                  onChange={handleFormChange}
                  className="border border-neutral-colors-500 rounded-lg p-3 w-full z-10"
                  disabled={subdistricts.length === 0}
                >
                  <option value="Subdistrict">Subdistrict</option>
                  {subdistricts.map((subdistrict) => (
                    <option key={subdistrict.id} value={subdistrict.id}>
                      {subdistrict.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleFormChange}
              placeholder="Postal Code"
              className="border border-neutral-colors-500 rounded-lg p-3"
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
                className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer mt-4 h-20 ${
                  deliveryOption === option ? "border-call-to-actions-900" : ""
                }`}
              >
                {/* Delivery Option Image */}
                <img
                  src="https://assets.kompasiana.com/items/album/2024/06/28/jne-reg-667e8e2fed64153ad268a362.png?t=o&v=300"
                  alt={option}
                  className="w-16 h-16 mr-4 object-cover"
                />

                {/* Option Text */}
                <span className="flex-grow">{option}</span>

                {/* Conditional Radio Button Icon */}
                <div className="flex flex-col items-end">
                  {deliveryOption === option && (
                    <IoRadioButtonOn className="text-xl mb-1 IoRadioIcon" />
                  )}
                  <span>Rp 15.000</span>
                </div>

                {/* Hidden Radio Input */}
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
        <div className="mt-8 mb-8">
          <h2 className="font-bold text-lg mb-4">Payment Method</h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              {
                method: "Bank BCA",
                image:
                  "https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-bca-bank-logo-png-image_6472275.png",
                icon: <IoRadioButtonOn />,
              },
              {
                method: "Bank BNI",
                image:
                  "https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-bca-bank-logo-png-image_6472275.png",
                icon: <IoRadioButtonOn />,
              },
              {
                method: "Bank BRI",
                image:
                  "https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-bca-bank-logo-png-image_6472275.png",
                icon: <IoRadioButtonOn />,
              },
              {
                method: "Qris",
                image:
                  "https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-bca-bank-logo-png-image_6472275.png",
                icon: <IoRadioButtonOn />,
              },
            ].map(({ method, image, icon }) => (
              <label
                key={method}
                className={`flex justify-center items-center border rounded-lg p-3 cursor-pointer ${
                  paymentMethod === method ? "border-call-to-actions-900" : ""
                }`}
              >
                {/* Payment Option Image */}
                <img
                  src={image}
                  alt={method}
                  className="w-16 h-16 mr-4 object-cover p-3"
                />

                {/* Payment Option Text */}
                <span className="flex-grow">{method}</span>

                {/* Conditional Radio Button Icon */}
                <div className="relative  flex flex-col items-end mb-10 IoRadioIcon">
                  {paymentMethod === method && icon}
                </div>

                {/* Hidden Radio Input */}
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
    )
}
export default CheckoutForm;