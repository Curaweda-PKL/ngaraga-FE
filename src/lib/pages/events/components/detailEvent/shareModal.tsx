// ShareModal.tsx
import React, { useState } from "react";
import { DiscordIcon } from "../svgsIcon/discordIcon";
import { IgIcon } from "../svgsIcon/igIcon";
import { CopyIcon } from "../svgsIcon/copyIcon";
import { WaIcon } from "../svgsIcon/waIcon";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const currentUrl = window.location.href;
  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopySuccess("Link copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    } catch (error) {
      setCopySuccess("Failed to copy!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Share Event</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl">
            &times;
          </button>
        </div>
        <div className="flex justify-around mb-4">
          <a
            href={`https://discord.com/channels/@me?url=${encodeURIComponent(
              currentUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <DiscordIcon  />
          </a>
          <a
            href={`https://www.instagram.com/?url=${encodeURIComponent(
              currentUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IgIcon  />
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              currentUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WaIcon />
          </a>
        </div>
        <div className="flex items-center border border-gray-300 rounded-md p-2">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="flex-1 outline-none"
          />
          <button onClick={copyToClipboard} className="ml-2">
            <CopyIcon  />
          </button>
        </div>
        {copySuccess && (
          <p className="text-green-500 text-sm mt-2">{copySuccess}</p>
        )}
      </div>
    </div>
  );
};

export default ShareModal;