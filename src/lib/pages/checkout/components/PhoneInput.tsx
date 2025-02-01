import React, { useState, useEffect, useRef,  } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Country {
  name: string;
  prefix: number;
  flag: string;
}

interface PhoneInputProps {
  className?: string;
  countryCode: string;
  phoneNumber: string;
  onChange: (countryCode: string, phoneNumber: string) => void;
}

const countries: Country[] = [
  { name: "Austria", prefix: 43, flag: "at" },
  { name: "Belgium", prefix: 32, flag: "be" },
  { name: "Bulgaria", prefix: 359, flag: "bg" },
  { name: "Netherlands", prefix: 31, flag: "nl" },
  { name: "Indonesia", prefix: 62, flag: "id" }, 
  // Add more countries here
];

const PhoneInput: React.FC<PhoneInputProps> = ({ className,  countryCode, phoneNumber, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>(countries);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex(prev => Math.min(prev + 1, filteredCountries.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex(prev => Math.max(prev - 1, -1));
          break;
        case "Enter":
          if (focusedIndex >= 0) {
            handleCountrySelect(filteredCountries[focusedIndex]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCountries, focusedIndex]);


  useEffect(() => {
    const numericCode = countryCode ? parseInt(countryCode.replace('+', '')) : NaN;
    const country = countries.find(c => c.prefix === numericCode) || countries[0];
    setSelectedCountry(country);
  }, [countryCode]);


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredCountries(
      countries.filter(
        country =>
          country.name.toLowerCase().includes(value) ||
          country.prefix.toString().startsWith(value)
      )
    );
    setFocusedIndex(-1);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setFocusedIndex(-1);
    onChange(`+${country.prefix}`, phoneNumber);

  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    onChange(`+${selectedCountry.prefix}`, value);
  };

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between border border-r-0 border-neutral-500 rounded-l-lg w-1/3 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <div className="flex items-center">
            <img
              src={`https://flagpedia.net/data/flags/icon/36x27/${selectedCountry.flag}.png`}
              alt={selectedCountry.name}
              className="w-6 h-4 mr-2"
            />
            <span className="text-gray-700 font-medium">+{selectedCountry.prefix}</span>
          </div>
          {isOpen ? (
            <FaChevronUp className="text-neutral-500 ml-2" />
          ) : (
            <FaChevronDown className="text-neutral-500 ml-2" />
          )}
        </button>

        {isOpen && (
          <div className="absolute z-10 w-1/3 bg-white border border-neutral-500 rounded-lg shadow-lg mt-1 top-full">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search country"
              value={search}
              onChange={handleSearchChange}
              className="w-full p-2 border-b border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ul
              role="listbox"
              className="max-h-60 overflow-y-auto"
              aria-label="Country selection"
            >
              {filteredCountries.map((country, index) => (
                <li
                  key={country.flag}
                  role="option"
                  aria-selected={selectedCountry.flag === country.flag}
                  onClick={() => handleCountrySelect(country)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  className={`flex items-center justify-between p-2 cursor-pointer ${
                    focusedIndex === index ? "bg-blue-50" : ""
                  } ${selectedCountry.flag === country.flag ? "bg-blue-100" : ""}`}
                >
                  <div className="flex items-center">
                    <img
                      src={`https://flagpedia.net/data/flags/icon/36x27/${country.flag}.png`}
                      alt={country.name}
                      className="w-6 h-4 mr-2"
                    />
                    <span className="text-gray-700">{country.name}</span>
                  </div>
                  <span className="text-gray-500">+{country.prefix}</span>
                </li>
              ))}
              {filteredCountries.length === 0 && (
                <li className="p-2 text-gray-500 text-center">No results found</li>
              )}
            </ul>
          </div>
        )}

        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="Enter phone number"
          className="flex-1 border border-neutral-500 rounded-r-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Phone number"
        />
      </div>
    </div>
  );
};

export default PhoneInput;