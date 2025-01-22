import React from "react";

const Header: React.FC = () => {
  return (
    <header
      className="relative w-full h-80 bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://via.placeholder.com/1280x500?text=Event+Image')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    </header>
  );
};

export default Header;
