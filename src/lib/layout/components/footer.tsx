import type React from "react";
import {FaDiscord, FaInstagram, FaTwitter, FaYoutube} from "react-icons/fa";

export const Footer: React.FC = () => {
  const socialLinks = [
    {icon: <FaDiscord className="h-5 w-5" />, href: "#"},
    {icon: <FaYoutube className="h-5 w-5" />, href: "#"},
    {icon: <FaTwitter className="h-5 w-5" />, href: "#"},
    {icon: <FaInstagram className="h-5 w-5" />, href: "#"},
  ];

  return (
    <footer className="bg-[#3B3B3B] px-4 py-8 sm:px-6 md:px-8 lg:px-16 xl:px-24">
      <div className="grid gap-8 sm:gap-10 md:grid-cols-3 md:gap-12">
        {/* Left Column - About */}
        <div className="grid gap-4 text-center md:text-left">
          {/* Logo */}
          <div className="flex items-center justify-center md:justify-start gap-2">
            <a className="btn btn-ghost text-xl flex lg:ml-3">
              <img
                src="/src/assets/img/LOGO.png"
                alt="Ngaraga Logo"
                className="w-8 h-8 mr-2"
              />
              Ngaraga
            </a>
          </div>

          {/* Description */}
          <p className="text-sm text-[#858584] max-w-xs mx-auto md:mx-0">
            Lorem ipsum dolor amet lorem ipsum dolor amet
          </p>

          {/* Community Section */}
          <div className="grid gap-4">
            <p className="text-sm text-[#858584]">Join our community</p>
            <div className="flex gap-3 justify-center md:justify-start">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3B3B3B] text-[#858584] transition-colors hover:bg-[#A259FF] hover:text-white"
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
              href="#"
              className="text-sm text-[#858584] hover:text-white transition-colors"
            >
              Marketplace
            </a>
            <a
              href="#"
              className="text-sm text-[#858584] hover:text-white transition-colors"
            >
              Rankings
            </a>
          </div>
        </div>

        {/* Right Column - Newsletter */}
        <div className="grid gap-4 text-center md:text-left">
          <h3 className="text-xl font-bold text-white">
            Join Our Weekly Update
          </h3>
          <p className="text-sm text-[#858584] max-w-xs mx-auto md:mx-0">
            Get exclusive promotions & updates straight to your inbox.
          </p>
          <div className="flex overflow-hidden rounded-full bg-white">
            <input
              type="email"
              placeholder="Enter your email here"
              className="flex-1 px-4 py-3 text-sm bg-white text-gray-500 outline-none"
            />
            <button className="bg-[#A259FF] px-6 py-3 text-sm text-white transition-colors hover:bg-[#8839FF]">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 sm:mt-10 md:mt-12 border-t pt-6 sm:pt-8">
        <p className="text-sm text-[#858584] text-center md:text-left">
          © Ngaraga by Dolanan yuk x Curaweda
        </p>
      </div>
    </footer>
  );
};

export default Footer;
