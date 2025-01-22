import React, {useState, useEffect} from "react";
import {AiOutlineUser} from "react-icons/ai";
import {MdOutlineMail} from "react-icons/md";
import {PiPackageLight} from "react-icons/pi";
import {TbTruckDelivery} from "react-icons/tb";
import PhoneInput from "./PhoneInput";
import axios from "axios";
import {IoRadioButtonOn} from "react-icons/io5";

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
  pickUpTime: string; // added for pick up time selection
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

const CheckoutForm: React.FC = () => {
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
    pickUpTime: "", // initialize with an empty value
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
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handlePickUpTimeChange = (time: string) => {
    setFormData((prev) => ({...prev, pickUpTime: time}));
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
      <div className="mt-10 space-y-4">
        {/* Tab Buttons */}
        <div className="flex gap-5 items-center mb-3">
  <button
    className={`btn ${
      deliveryOption === "Anter Aja"
        ? "bg-call-to-actions-100"
        : "bg-neutral-colors-200"
    } border rounded-lg`}
    onClick={() => setDeliveryOption("Anter Aja")}
  >
    <TbTruckDelivery size={18} />
    Delivery
  </button>
  <button
    className={`btn ${
      deliveryOption === "Pick up"
        ? "bg-call-to-actions-100"
        : "bg-neutral-colors-200"
    } border rounded-lg`}
    onClick={() => setDeliveryOption("Pick up")}
  >
    <PiPackageLight size={18} />
    Pick up
  </button>
</div>

        {/* Form Content for Delivery */}
        {deliveryOption === "Anter Aja" && (
  <div className="grid grid-cols-1 gap-4 ">
    <div className="p-4 border rounded-lg shadow-sm mt-4">
      <div className="flex items-center mb-4">
        <span className="material-icons text-gray-600 mr-2">home</span>
        <h3 className="text-lg font-semibold">Animakid</h3>
      </div>
      <p className="text-gray-700 text-sm mb-2">+62 854 5565 6745</p>
      <p className="text-gray-600 text-sm">
        Jl. Medan Merdeka Barat No.12, Gambir, Kecamatan Gambir, Kota Jakarta
        Pusat, Daerah Khusus Ibukota Jakarta 10110
      </p>
      <div className="flex mt-4 space-x-4">
        <button className="text-[#DDB11F] text-sm font-medium">Edit</button>
        <button className="text-[#DDB11F] text-sm font-medium">Delete</button>
      </div>
    </div>
    <div className="flex justify-between mt-4 mb-2">
      <button className="px-4 py-2 border-2 border-[#DDB11F] text-[#DDB11F] text-sm font-medium rounded-lg shadow hover:bg-[#DDB11F] hover:text-white transition">
        Change Address
      </button>
      <button className="px-4 py-2 bg-[#DDB11F] text-white text-sm font-medium rounded-lg shadow hover:bg-[#c5991a] transition">
        + Add New Address
      </button>
    </div>
  </div>
)}

        {/* Form Content for Pick Up */}
        {deliveryOption === "Pick up" && (
  <div className="grid grid-cols-1 gap-4 mb-8">
    <div className="border rounded-lg p-4 flex items-start gap-4 shadow-sm mt-4 mb-4">
      <div className="text-call-to-actions-100 "></div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Ngaraga by Dolanan</h3>
        <p className="text-sm text-neutral-colors-600">
          Jl. Medan Merdeka Barat No.12, Gambir, Kecamatan Gambir, Kota Jakarta
          Pusat, Daerah Khusus Ibukota Jakarta 10110
        </p>
      </div>
    </div>
    {/* Pick Up Time Section */}
    <div className="space-y-3">
      <p className="text-base font-medium">Pick a Pickup Time</p>
      <div className="max-w-sm grid grid-cols-5 gap-2">
        {availablePickUpTimes.map((time) => (
          <div
            key={time}
            className={`flex items-center justify-center border border-gray-300 rounded-md cursor-pointer px-3 py-2 ${
              formData.pickUpTime === time
                ? "bg-gray-200 text-gray-800"
                : "bg-white text-gray-600"
            }`}
            onClick={() => handlePickUpTimeChange(time)}
          >
            <p className="text-sm font-medium">{time}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
 {deliveryOption === "Anter Aja" && (
  <div className="mt-8">
    <h2 className="font-bold text-lg mb-4">Delivery Options</h2>
    <div className="space-y-4 mb-10">
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
)}
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
          ].map(({method, image, icon}) => (
            <label
              key={method}
              className={`flex justify-center items-center border rounded-lg p-3 cursor-pointer mb-16 ${
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
    </div>
  );
};
export default CheckoutForm;
