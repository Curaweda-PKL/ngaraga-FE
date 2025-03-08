import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
  children?: React.ReactNode;
}

const useClickOutside = (ref: React.RefObject<HTMLDivElement>, handler: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
};

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApply, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  // Prevent body scroll when modal is open.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const modalVariants = {
    hidden: { opacity: 0, translateY: "100%" },
    visible: { opacity: 1, translateY: "0%" },
    exit: { opacity: 0, translateY: "100%" },
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end md:items-center justify-center">
      <motion.div
        ref={modalRef}
        className="bg-white w-full max-w-md max-h-[80%] overflow-y-auto rounded-2xl p-6 shadow-lg"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* Modal Header */}
        <div className="text-center relative">
          <h2 className="text-lg font-semibold text-gray-800">Filter</h2>
          <button
            className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-800"
            onClick={onClose}
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <hr className="my-4 border-t-2 border-gray-200" />
        </div>

        {/* Modal Content */}
        <div className="mb-6">
          {children || (
            <ul className="space-y-4">
              <li className="flex items-center">
                <input type="radio" id="art" name="category" className="mr-3 accent-[--call-to-action]" />
                <label htmlFor="art" className="text-gray-700">Art</label>
              </li>
            </ul>
          )}
        </div>

        {/* Modal Footer */}
        <hr className="my-4 border-t-2 border-gray-200" />
        <div className="flex justify-between">
          <button
            className="flex-1 border border-call-to-action text-call-to-action py-2 px-4 rounded-lg mr-2"
            onClick={onClose}
          >
            Cancel
          </button>

        </div>
      </motion.div>
    </div>
  );
};

export default FilterModal;
