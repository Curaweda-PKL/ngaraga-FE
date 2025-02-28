import React from "react";

interface PaginationProps {
    className?: string;
}

export const PaginationMember: React.FC<PaginationProps> = ({ className, ...props }) => {
  return (
    <div className={`flex justify-end items-center mt-4 ${className}`} {...props}>
      <div className="flex gap-1">
        {[1, 2, 3, "...", 10].map((page, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded ${
              page === 1 ? "bg-call-to-actions-900 text-white" : "text-gray-600"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};