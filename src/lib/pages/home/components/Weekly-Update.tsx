import React, {useState} from "react";
import astronaut from "@/assets/img/discoverastro.png"
export const WeeklyUpdateForm: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email.trim() !== "") {
      console.log("Subscribed:", email);
      setEmail("");
    }
  };

  return (
    <div className="flex justify-center items-center h-auto py-32 font-sans">
      <div className="flex bg-[#3B3B3B] py-20 px-56 rounded-3xl">
        <div className="flex-1 p-8">
          <img
            src={astronaut}
            alt="Astronaut"
            className="w-full h-auto"
          />
        </div>
        <div className="flex-1 p-8 text-white">
          <h1 className="text-3xl font-bold mb-4">Join Our Weekly Update</h1>
          <p className="mb-6">
            Get Exclusive Promotions & Updates Straight To Your Inbox.
          </p>
          <div className="flex justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email here"
              className="px-4 py-2 rounded-l-md focus:outline-none"
            />
            <button
              onClick={handleSubscribe}
              className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700 focus:outline-none"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

