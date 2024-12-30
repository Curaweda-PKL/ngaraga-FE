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

  // Toggle dropdown open/close
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on unmount or when dropdown closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close the dropdown when an item is selected
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
        {iconLeft && <span className="mr-2">{iconLeft}</span>} {/* Left icon */}
        <span>{buttonText}</span>
        {iconRight && <span className="ml-2">{iconRight}</span>} {/* Right icon */}
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 bg-white rounded-box z-[1] w-52 p-2 shadow">
          {React.Children.map(children, (child) => {
            return React.cloneElement(child as React.ReactElement, {
              onClick: handleSelect, 
            });
          })}
        </ul>
      )}
    </div>
  );
};
