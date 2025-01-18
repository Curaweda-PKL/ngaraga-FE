import type React from 'react';
import { useState } from 'react';

export const WeeklyUpdateForm: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email.trim() !== '') {
      setEmail('');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-20 max-w-6xl mx-auto sm:px-6 md:px-8 lg:px-0">
      <div className="flex flex-col lg:flex-row bg-[#3B3B3B] py-10 px-6 sm:px-10 rounded-none lg:rounded-3xl -mb-20 sm:-mb-20 md:-mb-20 lg:mb-0">
        <div className="flex-1 p-8">
          <img
            src="/src/assets/img/Astronout.png"
            alt="Astronaut"
            className="w-full h-auto"
          />
        </div>
        <div className="flex-1 p-8 text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Join Our Weekly Update
          </h1>
          <p className="mb-6 text-lg sm:text-xl md:text-2xl">
            Get Exclusive Promotions & Updates Straight To Your Inbox.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email here"
              className="w-full sm:w-full md:w-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-2xl focus:outline-none bg-white text-gray-500"
            />
            <button
              onClick={handleSubscribe}
              className="w-full sm:w-full md:w-full bg-call-to-action text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-2xl hover:bg-call-to-actions-800 focus:outline-none"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
