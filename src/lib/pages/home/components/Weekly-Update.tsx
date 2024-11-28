import React, {useState} from "react";

export const WeeklyUpdateForm: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email.trim() !== "") {
      console.log("Subscribed:", email);
      setEmail("");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center lg:flex-row py-20 max-w-6xl mx-auto sm:px-6 md:px-4 lg:px-0">
      <div className="flex bg-[#3B3B3B] py-10 px-10 rounded-3xl">
        <div className="flex-1 p-8">
          <img
            src="/src/assets/img/Astronout.png"
            alt="Astronaut"
            className="w-full h-auto"
          />
        </div>
        <div className="flex-1 p-8 text-white">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Join Our Weekly Update
          </h1>
          <p className="mb-6 text-xl sm:text-2xl">
            Get Exclusive Promotions & Updates Straight To Your Inbox.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email here"
              className="px-6 py-3 sm:px-20 sm:py-4 rounded-2xl focus:outline-none bg-white text-gray-500"
            />
            <button
              onClick={handleSubscribe}
              className="bg-[#A259FF] text-white px-6 py-3 sm:px-10 sm:py-4 rounded-2xl hover:bg-[#8839FF] focus:outline-none"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
