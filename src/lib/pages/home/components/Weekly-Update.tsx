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
    <div className="flex justify-center items-center h-auto py-28 font-sans">
      <div className="flex bg-[#3B3B3B] py-10 px-10 rounded-3xl">
        <div className="flex-1 p-8">
          <img
            src="/src/assets/img/Astronout.png"
            alt="Astronaut"
            className="w-full h-auto"
          />
        </div>
        <div className="flex-1 p-8 text-white">
          <h1 className="text-5xl font-bold mb-4">Join Our Weekly Update</h1>
          <p className="mb-6 text-2xl">
            Get Exclusive Promotions & Updates Straight To Your Inbox.
          </p>
          <div className="flex justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email here"
              className="px-20 py-4 rounded-2xl focus:outline-none"
            />
            <button
              onClick={handleSubscribe}
              className="bg-purple-600 text-white px-10 py-2 rounded-2xl hover:bg-purple-700 focus:outline-none"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
