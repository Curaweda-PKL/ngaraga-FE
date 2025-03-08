import React, { useState, memo, useMemo } from "react"; 
import { FaDiscord, FaInstagram, FaTwitter, FaYoutube, FaSpinner } from "react-icons/fa";
import { SERVER_URL } from "@/middleware/utils";
import { useMutation } from "@tanstack/react-query";

// Static text and constants extracted outside the component
const FOOTER_TEXT =
  "Welcome to Ngaraga, your go-to marketplace for rare and collectible cards. Join our community of passionate collectors and experience the world of trading like never before!";
const NEWSLETTER_TEXT =
  "Get exclusive promotions & updates straight to your inbox";
const COPYRIGHT_TEXT = "© Ngaraga by Dolanan yuk x Curaweda.";

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Memoize social links array to prevent re-creation on each render
  const socialLinks = useMemo(
    () => [
      { icon: <FaDiscord className="h-5 w-5" />, href: "#" },
      { icon: <FaYoutube className="h-5 w-5" />, href: "#" },
      { icon: <FaTwitter className="h-5 w-5" />, href: "#" },
      { icon: <FaInstagram className="h-5 w-5" />, href: "#" },
    ],
    []
  );

  // Use react-query for subscription mutation
  const mutation = useMutation<any, Error, string>({
    mutationFn: async (email) => {
      const response = await fetch(`${SERVER_URL}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error("Subscription failed");
      }
      return response.json();
    },
    onSuccess: () => {
      setMessage("Email verification has been sent! Please check your inbox.");
      setEmail("");
    },
    onError: () => {
      setMessage("There was an error with the subscription. Please try again.");
    },
  });

  // Derive loading state based on mutation status ("pending" indicates loading)
  const isLoading = mutation.status === "pending";

  return (
    <footer className="bg-[#3B3B3B] px-4 py-8 sm:px-6 md:px-8 lg:px-16 xl:px-24 text-white">
      <div className="grid gap-8 sm:gap-10 md:grid-cols-3 md:gap-12">
        {/* Left Column - About */}
        <div className="grid gap-4 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 lg:-ml-7">
            <a className="btn btn-ghost text-xl flex lg:ml-3 text-white">
              <img
                src="/src/assets/img/LOGO.png"
                alt="Ngaraga Logo"
                className="w-8 h-8 mr-2 filter invert"
              />
              Ngaraga
            </a>
          </div>
          <p className="text-sm text-white max-w-xs mx-auto md:mx-0">
            {FOOTER_TEXT}
          </p>
          <div className="grid gap-4">
            <p className="text-sm text-white">Join our vibrant community</p>
            <div className="flex gap-3 justify-center md:justify-start">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3B3B3B] text-white transition-transform duration-300 hover:bg-[#FFC107] hover:text-black hover:scale-105"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column - Explore */}
        <div className="grid gap-4 text-center md:text-left">
          <h3 className="text-xl font-bold text-white">Explore</h3>
          <div className="grid gap-3">
            <a
              href="/marketplace"
              className="text-sm text-white transition-colors duration-300 hover:text-[#FFC107] hover:underline"
            >
              Marketplace
            </a>
            <a
              href="/rankings"
              className="text-sm text-white transition-colors duration-300 hover:text-[#FFC107] hover:underline"
            >
              Rankings
            </a>
            <a
              href="#"
              className="text-sm text-white transition-colors duration-300 hover:text-[#FFC107] hover:underline"
            >
              Card Releases
            </a>
            <a
              href="#"
              className="text-sm text-white transition-colors duration-300 hover:text-[#FFC107] hover:underline"
            >
              FAQs
            </a>
          </div>
        </div>

        {/* Right Column - Newsletter */}
        <div className="grid gap-4 text-center md:text-left">
          <h3 className="text-xl font-bold text-white">Join our weekly Update</h3>
          <p className="text-sm text-white max-w-xs mx-auto md:mx-0">
            {NEWSLETTER_TEXT}
          </p>
          <div className="flex rounded-lg bg-[#2b2b2b]">
            <input
              type="email"
              placeholder="Enter your email here"
              className="flex-1 px-4 text-sm bg-[#2b2b2b] text-white border-transparent rounded-l-lg focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={() => mutation.mutate(email)}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-r-lg px-6 py-3 shadow-lg transition-colors duration-300 hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </div>
          {message && <p className="mt-2 text-sm text-white">{message}</p>}
        </div>
      </div>

      {/* Copyright */}
      <div
        className="mt-8 sm:mt-10 md:mt-12 border-t pt-6 sm:pt-8"
        style={{ borderTop: "1px solid var(--old-secondary)" }}
      >
        <p className="text-sm text-white text-center md:text-left">
          {COPYRIGHT_TEXT}
        </p>
      </div>
    </footer>
  );
};

export default memo(Footer);
