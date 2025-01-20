import React, {useState} from "react";

const EventRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Heading */}
      <h1 className="text-4xl text-[#171717] font-bold mb-8">Register</h1>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Registration Form */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded-lg"
          >
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center">
              <span className="inline-block px-4 py-3 bg-gray-100 border border-r-0 rounded-l-lg text-gray-700">
                +62
              </span>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-r-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </form>
        </div>

        {/* Event Summary */}
        <div className="bg-gray-50 border p-6 rounded-lg shadow-md lg:mt-0 lg:ml-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Summary Event
          </h2>
          <div className="bg-gray-100 border-t rounded-lg flex items-center p-4 mb-4">
            <img
              src="/src/assets/img/dall-e.png"
              alt="Event Thumbnail"
              className="float-left w-32 h-24 object-cover rounded-lg mr-4"
            />
            <div className="flex-col">
              <h3 className="text-gray-800 text-left font-semibold mb-2">
                A Special Evening Celebration
              </h3>
              <p className="text-gray-500 text-left text-sm mb-2">
                <span>08:00 - 20:00</span> | <span>07 Dec 2024</span>
              </p>
              <p className="text-gray-500 text-left text-sm">Zoom Meeting</p>
            </div>
          </div>
          <button
            type="button"
            className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventRegistration;
