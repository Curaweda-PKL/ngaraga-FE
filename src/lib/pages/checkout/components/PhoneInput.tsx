import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Country {
  name: string;
  prefix: number;
  flag: string;
}

const countries: Country[] = [
  { name: "Austria", prefix: 43, flag: "at" },
  { name: "Belgium", prefix: 32, flag: "be" },
  { name: "Bulgaria", prefix: 359, flag: "bg" },
  { name: "Netherlands", prefix: 31, flag: "id" },
  // Add more countries here
];

const PhoneInput: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>(countries);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredCountries(
      countries.filter(
        (country) =>
          country.name.toLowerCase().includes(value) ||
          country.prefix.toString().includes(value)
      )
    );
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-full" ref={dropdownRef}>
      <div className="flex items-center">
        {/* Country Selector */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center border border-neutral-colors-500 rounded-l-lg w-1/3 px-3 py-2 focus:outline-none"
        >
          <img
            src={`https://flagpedia.net/data/flags/icon/36x27/${selectedCountry.flag}.png`}
            alt={selectedCountry.name}
            className="w-6 h-4"
          />
          <span className="text-gray-700 font-medium ml-2">+{selectedCountry.prefix}</span>

          {/* Dropdown Icon */}
          <span className="ml-auto">
            {isOpen ? (
              <FaChevronUp className="text-neutral-colors-500" />
            ) : (
              <FaChevronDown className="text-neutral-colors-500" />
            )}
          </span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-10 w-1/3 bg-white border border-neutral-colors-500 rounded-lg mt-2 top-full left-[-5px]">
            <input
              type="text"
              placeholder="Search country"
              value={search}
              onChange={handleSearchChange}
              className="w-full p-3 border box-border "
            />
            <ul className="max-h-60 overflow-y-auto">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <li
                    key={country.flag}
                    onClick={() => handleCountrySelect(country)}
                    className={`flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100 ${
                      selectedCountry.flag === country.flag ? "bg-gray-200" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <img
                        src={`https://flagpedia.net/data/flags/icon/36x27/${country.flag}.png`}
                        alt={country.name}
                        className="w-6 h-4"
                      />
                      <span className="text-gray-700 font-medium">{country.name}</span>
                    </div>
                    <span className="text-gray-500">+{country.prefix}</span>
                  </li>
                ))
              ) : (
                <li className="p-3 text-gray-500 text-center">No results found</li>
              )}
            </ul>
          </div>
        )}

        {/* Phone Number Input */}
        <input
          type="tel"
          placeholder="Enter phone number"
          className="w-2/3 border border-neutral-colors-500 rounded-r-lg px-3 py-2 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default PhoneInput;
