import axios from "axios";
import React, { useState, useEffect } from "react";
import PhoneInput from "../../checkout/components/PhoneInput";
import { SERVER_URL } from "@/middleware/utils";

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
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

const AddAddressModal: React.FC<AddAddressModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+62");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  
  // For province, city, and subdistrict we now store both the ID and the name.
  const [province, setProvince] = useState(""); // holds province id
  const [provinceName, setProvinceName] = useState(""); // holds province name
  const [city, setCity] = useState(""); // holds city id
  const [cityName, setCityName] = useState(""); // holds city name
  const [subdistrict, setSubdistrict] = useState(""); // holds subdistrict id
  const [subdistrictName, setSubdistrictName] = useState(""); // holds subdistrict name

  const [postalCode, setPostalCode] = useState("");
  const [addressDetails, setAddressDetails] = useState("");

  // API data states
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [subdistricts, setSubdistricts] = useState<Subdistrict[]>([]);
  const [loading, setLoading] = useState({
    provinces: false,
    cities: false,
    subdistricts: false,
  });
  const [error, setError] = useState({
    provinces: "",
    cities: "",
    subdistricts: "",
  });

  // New state for saving the address
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  console.log("Current country:", country);

  useEffect(() => {
    const fetchProvinces = async () => {
      if (country === "Indonesia") {
        setLoading((prev) => ({ ...prev, provinces: true }));
        setError((prev) => ({ ...prev, provinces: "" }));
        try {
          const response = await axios.get<Province[]>(
            "https://curaweda-pkl.github.io/api-wilayah-indonesia/api/provinces.json"
          );
          setProvinces(response.data);
        } catch (err) {
          setError((prev) => ({ ...prev, provinces: "Failed to load provinces" }));
        } finally {
          setLoading((prev) => ({ ...prev, provinces: false }));
        }
      }
    };

    fetchProvinces();
  }, [country]);

  useEffect(() => {
    const fetchCities = async () => {
      if (country === "Indonesia" && province) {
        setLoading((prev) => ({ ...prev, cities: true }));
        setError((prev) => ({ ...prev, cities: "" }));
        try {
          const response = await axios.get<City[]>(
            `https://curaweda-pkl.github.io/api-wilayah-indonesia/api/regencies/${province}.json`
          );
          setCities(response.data);
        } catch (err) {
          setError((prev) => ({ ...prev, cities: "Failed to load cities" }));
        } finally {
          setLoading((prev) => ({ ...prev, cities: false }));
        }
      }
    };

    fetchCities();
  }, [province, country]);

  useEffect(() => {
    const fetchSubdistricts = async () => {
      if (country === "Indonesia" && city) {
        setLoading((prev) => ({ ...prev, subdistricts: true }));
        setError((prev) => ({ ...prev, subdistricts: "" }));
        try {
          const response = await axios.get<Subdistrict[]>(
            `https://curaweda-pkl.github.io/api-wilayah-indonesia/api/districts/${city}.json`
          );
          setSubdistricts(response.data);
        } catch (err) {
          setError((prev) => ({ ...prev, subdistricts: "Failed to load subdistricts" }));
        } finally {
          setLoading((prev) => ({ ...prev, subdistricts: false }));
        }
      }
    };

    fetchSubdistricts();
  }, [city, country]);

  // Return null if modal is not open
  if (!isOpen) return null;

  const handleSaveAddress = async () => {
    // Basic validation for required fields (adjust as needed)
    if (!country || !province || !city || !subdistrict || !postalCode || !addressDetails) {
      setSaveError("Please fill out all required fields.");
      return;
    }
    setSaving(true);
    setSaveError("");
    try {
      // Build payload including both id and name fields.
      const payload = {
        fullName,
        country,
        province: provinceName,     // the name of the province
        provinceId: province,       // the id of the province
        city: cityName,             // the name of the city
        cityId: city,               // the id of the city
        subdistrict: subdistrictName, // the name of the subdistrict
        subdistrictId: subdistrict,   // the id of the subdistrict
        postalCode,
        addressDetails,             // Will be mapped to 'details' in the backend if needed
      };

      const response = await axios.post(
        `${SERVER_URL}/api/account/addresses`,
        payload,
        { withCredentials: true }
      );
      console.log("Address created:", response.data);
      // Optionally refresh addresses list here
      onClose();
    } catch (err: any) {
      console.error("Error creating address", err);
      setSaveError(err.response?.data?.message || "Failed to create address.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
      onClick={(e) => {
        // Close only if clicking directly on the overlay
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="bg-white modal-box relative rounded-lg shadow-lg w-11/12 max-w-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="text-2xl font-bold mb-4">Add New Address</h3>
        <hr className="mb-6" />

        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <PhoneInput
            countryCode={phoneCountryCode}
            phoneNumber={phoneNumber}
            onChange={(code, number) => {
              setPhoneCountryCode(code);
              setPhoneNumber(number);
            }}
          />
        </div>

        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Country</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              // Reset location fields when country changes
              setProvince("");
              setProvinceName("");
              setCity("");
              setCityName("");
              setSubdistrict("");
              setSubdistrictName("");
              console.log("Current country:", e.target.value);
            }}
          >
            <option value="">Select Country</option>
            <option value="Indonesia">Indonesia</option>
            <option value="USA">USA</option>
            <option value="Malaysia">Malaysia</option>
          </select>
        </div>

        <div className="flex gap-6 mb-6">
          {/* Province Select */}
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Province</span>
            </label>
            {country === "Indonesia" ? (
              <>
                <select
                  className="select select-bordered"
                  value={province}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    setProvince(selectedId);
                    const selected = provinces.find((prov) => prov.id === selectedId);
                    setProvinceName(selected ? selected.name : "");
                    // Reset dependent fields
                    setCity("");
                    setCityName("");
                    setSubdistrict("");
                    setSubdistrictName("");
                  }}
                  disabled={loading.provinces || !!error.provinces}
                >
                  <option value="">Select Province</option>
                  {provinces.map((prov) => (
                    <option key={prov.id} value={prov.id}>
                      {prov.name}
                    </option>
                  ))}
                </select>
                {loading.provinces && (
                  <span className="text-sm mt-1">Loading provinces...</span>
                )}
                {error.provinces && (
                  <span className="text-red-500 text-sm mt-1">{error.provinces}</span>
                )}
              </>
            ) : (
              <input
                type="text"
                placeholder="Province"
                className="input input-bordered"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            )}
          </div>
          {/* City Select */}
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">City/Regency</span>
            </label>
            {country === "Indonesia" ? (
              <>
                <select
                  className="select select-bordered"
                  value={city}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    setCity(selectedId);
                    const selected = cities.find((cty) => cty.id === selectedId);
                    setCityName(selected ? selected.name : "");
                    // Reset subdistrict fields
                    setSubdistrict("");
                    setSubdistrictName("");
                  }}
                  disabled={!province || loading.cities || !!error.cities}
                >
                  <option value="">Select City</option>
                  {cities.map((cty) => (
                    <option key={cty.id} value={cty.id}>
                      {cty.name}
                    </option>
                  ))}
                </select>
                {loading.cities && (
                  <span className="text-sm mt-1">Loading cities...</span>
                )}
                {error.cities && (
                  <span className="text-red-500 text-sm mt-1">{error.cities}</span>
                )}
              </>
            ) : (
              <input
                type="text"
                placeholder="City/Regency"
                className="input input-bordered"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            )}
          </div>
        </div>

        <div className="flex gap-6 mb-6">
          {/* Subdistrict Select */}
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Subdistrict</span>
            </label>
            {country === "Indonesia" ? (
              <>
                <select
                  className="select select-bordered"
                  value={subdistrict}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    setSubdistrict(selectedId);
                    const selected = subdistricts.find((sub) => sub.id === selectedId);
                    setSubdistrictName(selected ? selected.name : "");
                  }}
                  disabled={!city || loading.subdistricts || !!error.subdistricts}
                >
                  <option value="">Select Subdistrict</option>
                  {subdistricts.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
                {loading.subdistricts && (
                  <span className="text-sm mt-1">Loading subdistricts...</span>
                )}
                {error.subdistricts && (
                  <span className="text-red-500 text-sm mt-1">{error.subdistricts}</span>
                )}
              </>
            ) : (
              <input
                type="text"
                placeholder="Subdistrict"
                className="input input-bordered"
                value={subdistrict}
                onChange={(e) => setSubdistrict(e.target.value)}
              />
            )}
          </div>

          {/* Postal Code */}
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Postal Code</span>
            </label>
            <input
              type="text"
              placeholder="Postal Code"
              className="input input-bordered"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </div>

        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Address Details</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            placeholder="Address Details"
            value={addressDetails}
            onChange={(e) => setAddressDetails(e.target.value)}
          ></textarea>
        </div>

        {saveError && (
          <div className="text-red-500 text-sm mb-4">{saveError}</div>
        )}

        <div className="modal-action">
          <button
            className="btn btn-primary bg-call-to-actions-900 border border-call-to-actions-900 hover:bg-call-to-actions-800 text-white ring-call-to-actions-900"
            onClick={handleSaveAddress}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAddressModal;
