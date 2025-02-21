// src/components/EditAddressModal.tsx
import axios from "axios";
import React, {useState, useEffect} from "react";
import PhoneInput from "../../checkout/components/PhoneInput";
import {SERVER_URL} from "@/middleware/utils";

// Define the Address interface (adjust fields as needed)
export interface Address {
  id: string;
  details: string;
  postalCode: string;
  province: string;
  provinceId: string;
  city: string;
  cityId: string;
  subdistrict: string;
  subdistrictId: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  countryCode?: string;
  fullName?: string;
  phoneNumber?: string;
  // Include related account data
  account?: {
    phoneNumber?: string;
    countryCode?: string;
    fullName?: string;
  };
}

interface EditAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: Address; // The existing address data to edit (with account included)
  onAddressUpdated: (updatedAddress: Address) => void;
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

const EditAddressModal: React.FC<EditAddressModalProps> = ({
  isOpen,
  onClose,
  address,
  onAddressUpdated,
}) => {
  // Prepopulate address-related fields:
  const [country, setCountry] = useState(address.country || "");
  const [province, setProvince] = useState(address.provinceId || "");
  const [provinceName, setProvinceName] = useState(address.province || "");
  const [city, setCity] = useState(address.cityId || "");
  const [cityName, setCityName] = useState(address.city || "");
  const [subdistrict, setSubdistrict] = useState(address.subdistrictId || "");
  const [subdistrictName, setSubdistrictName] = useState(
    address.subdistrict || ""
  );
  const [postalCode, setPostalCode] = useState(address.postalCode || "");
  const [addressDetails, setAddressDetails] = useState(address.details || "");

  // For account-related fields, initialize from the account object:
  const [fullName, setFullName] = useState(
    address.fullName || address.account?.fullName || ""
  );
  const [phoneCountryCode, setCountryCode] = useState(
    address.account?.countryCode || ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    address.account?.phoneNumber || ""
  );

  // API data states for location selects
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

  // Saving state
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Fetch provinces when country changes
  useEffect(() => {
    const fetchProvinces = async () => {
      if (country === "Indonesia") {
        setLoading((prev) => ({...prev, provinces: true}));
        setError((prev) => ({...prev, provinces: ""}));
        try {
          const response = await axios.get<Province[]>(
            "https://curaweda-pkl.github.io/api-wilayah-indonesia/api/provinces.json"
          );
          setProvinces(response.data);
        } catch (err) {
          setError((prev) => ({
            ...prev,
            provinces: "Failed to load provinces",
          }));
        } finally {
          setLoading((prev) => ({...prev, provinces: false}));
        }
      }
    };
    fetchProvinces();
  }, [country]);

  // Fetch cities when province changes
  useEffect(() => {
    const fetchCities = async () => {
      if (country === "Indonesia" && province) {
        setLoading((prev) => ({...prev, cities: true}));
        setError((prev) => ({...prev, cities: ""}));
        try {
          const response = await axios.get<City[]>(
            `https://curaweda-pkl.github.io/api-wilayah-indonesia/api/regencies/${province}.json`
          );
          setCities(response.data);
        } catch (err) {
          setError((prev) => ({...prev, cities: "Failed to load cities"}));
        } finally {
          setLoading((prev) => ({...prev, cities: false}));
        }
      }
    };
    fetchCities();
  }, [province, country]);

  // Fetch subdistricts when city changes
  useEffect(() => {
    const fetchSubdistricts = async () => {
      if (country === "Indonesia" && city) {
        setLoading((prev) => ({...prev, subdistricts: true}));
        setError((prev) => ({...prev, subdistricts: ""}));
        try {
          const response = await axios.get<Subdistrict[]>(
            `https://curaweda-pkl.github.io/api-wilayah-indonesia/api/districts/${city}.json`
          );
          setSubdistricts(response.data);
        } catch (err) {
          setError((prev) => ({
            ...prev,
            subdistricts: "Failed to load subdistricts",
          }));
        } finally {
          setLoading((prev) => ({...prev, subdistricts: false}));
        }
      }
    };
    fetchSubdistricts();
  }, [city, country]);

  // Reinitialize the form when modal opens:
  useEffect(() => {
    if (isOpen) {
      setFullName(address.fullName || address.account?.fullName || "");
      setCountryCode(address.account?.countryCode || "");
      setPhoneNumber(address.account?.phoneNumber || "");
      setCountry(address.country || "");
      setProvince(address.provinceId || "");
      setProvinceName(address.province || "");
      setCity(address.cityId || "");
      setCityName(address.city || "");
      setSubdistrict(address.subdistrictId || "");
      setSubdistrictName(address.subdistrict || "");
      setPostalCode(address.postalCode || "");
      setAddressDetails(address.details || "");
    }
  }, [isOpen, address]);

  const handleSaveAddress = async () => {
    if (
      !country ||
      !province ||
      !city ||
      !subdistrict ||
      !postalCode ||
      !addressDetails
    ) {
      setSaveError("Please fill out all required fields.");
      return;
    }
    setSaving(true);
    setSaveError("");
    try {
      const payload = {
        fullName,
        country,
        province: provinceName,
        provinceId: province,
        city: cityName,
        cityId: city,
        subdistrict: subdistrictName,
        subdistrictId: subdistrict,
        postalCode,
        addressDetails,
      };

      const response = await axios.put(
        `${SERVER_URL}/api/account/addresses/${address.id}`,
        payload,
        {withCredentials: true}
      );
      console.log("Address updated:", response.data);
      // Call the callback to update the parent's state
      onAddressUpdated(response.data);
      onClose();
    } catch (err: any) {
      console.error("Error updating address", err);
      setSaveError(err.response?.data?.message || "Failed to update address.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
      onClick={(e) => {
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

        <h3 className="text-2xl font-bold mb-4">Edit Address</h3>
        <hr className="mb-6" />

        {/* Full Name */}
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

        {/* Phone Number (disabled) */}
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <PhoneInput
            countryCode={phoneCountryCode}
            phoneNumber={phoneNumber}
            disabled={true}
            onChange={(_code, _number) => {}}
          />
        </div>

        {/* Country selection */}
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Country</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setProvince("");
              setProvinceName("");
              setCity("");
              setCityName("");
              setSubdistrict("");
              setSubdistrictName("");
            }}
          >
            <option value="">Select Country</option>
            <option value="Indonesia">Indonesia</option>
            <option value="USA">USA</option>
            <option value="Malaysia">Malaysia</option>
          </select>
        </div>

        {/* Province and City selection */}
        <div className="flex gap-6 mb-6">
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
                    const selected = provinces.find(
                      (prov) => prov.id === selectedId
                    );
                    setProvinceName(selected ? selected.name : "");
                    setCity("");
                    setCityName("");
                    setSubdistrict("");
                    setSubdistrictName("");
                  }}
                  disabled={loading.provinces || !!error.provinces}
                >
                  <option value="">Select Province</option>
                  {provinces.map((prov) => (
                    <option
                      key={prov.id}
                      value={prov.id}
                    >
                      {prov.name}
                    </option>
                  ))}
                </select>
                {loading.provinces && (
                  <span className="text-sm mt-1">Loading provinces...</span>
                )}
                {error.provinces && (
                  <span className="text-red-500 text-sm mt-1">
                    {error.provinces}
                  </span>
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
                    const selected = cities.find(
                      (cty) => cty.id === selectedId
                    );
                    setCityName(selected ? selected.name : "");
                    setSubdistrict("");
                    setSubdistrictName("");
                  }}
                  disabled={!province || loading.cities || !!error.cities}
                >
                  <option value="">Select City</option>
                  {cities.map((cty) => (
                    <option
                      key={cty.id}
                      value={cty.id}
                    >
                      {cty.name}
                    </option>
                  ))}
                </select>
                {loading.cities && (
                  <span className="text-sm mt-1">Loading cities...</span>
                )}
                {error.cities && (
                  <span className="text-red-500 text-sm mt-1">
                    {error.cities}
                  </span>
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

        {/* Subdistrict and Postal Code */}
        <div className="flex gap-6 mb-6">
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
                    const selected = subdistricts.find(
                      (sub) => sub.id === selectedId
                    );
                    setSubdistrictName(selected ? selected.name : "");
                  }}
                  disabled={
                    !city || loading.subdistricts || !!error.subdistricts
                  }
                >
                  <option value="">Select Subdistrict</option>
                  {subdistricts.map((sub) => (
                    <option
                      key={sub.id}
                      value={sub.id}
                    >
                      {sub.name}
                    </option>
                  ))}
                </select>
                {loading.subdistricts && (
                  <span className="text-sm mt-1">Loading subdistricts...</span>
                )}
                {error.subdistricts && (
                  <span className="text-red-500 text-sm mt-1">
                    {error.subdistricts}
                  </span>
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

        {/* Address Details */}
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

export default EditAddressModal;
