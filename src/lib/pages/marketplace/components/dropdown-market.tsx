import React, { useState, useEffect, useRef } from "react";

interface DropdownProps {
  buttonText: string;
  children: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const DropdownMarket: React.FC<DropdownProps> = ({
  buttonText,
  children,
  iconLeft,
  iconRight,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center gap-2 bg-white text-[#404040] border-2 py-3 px-5 rounded-full hover:bg-gray-100"
      >
        {iconLeft && <span className="mr-2">{iconLeft}</span>}
        <span>{buttonText}</span>
        {iconRight && <span className="ml-2">{iconRight}</span>}
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 bg-white rounded-lg z-50 w-52 p-2 shadow-lg">
          {React.Children.map(children, (child) =>
            React.cloneElement(child as React.ReactElement, { onClick: handleSelect })
          )}
        </ul>
      )}
    </div>
  );
};
