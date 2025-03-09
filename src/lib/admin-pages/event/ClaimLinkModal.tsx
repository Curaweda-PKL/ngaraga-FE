import { useRef, FC } from "react";
import QRCode from "react-qr-code";
import { CardReward } from "./events";

interface ClaimLinkModalProps {
  cardRewards: CardReward[];
  selectedCardId: string | number;
  setSelectedCardId: (id: string | number) => void;
  generatedLink: string;
  generatedQRCode: string;
  isGenerating: boolean;
  onGenerateClaim: () => void;
  onCopyLink: () => void;
  onClose: () => void;
}

const ClaimLinkModal: FC<ClaimLinkModalProps> = ({
  cardRewards,
  selectedCardId,
  setSelectedCardId,
  generatedLink,
  generatedQRCode,
  isGenerating,
  onGenerateClaim,
  onCopyLink,
  onClose,
}) => {
  // Ref for QR Code element (for downloading)
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRAs = (mimeType: string, extension: string) => {
    if (!qrRef.current) return;
    const element = qrRef.current;
    const svg = element.querySelector("svg");
    if (!svg) return;
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svg);
    if (
      !svgString.match(
        /^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/
      )
    )
      svgString = svgString.replace(
        /^<svg/,
        '<svg xmlns="http://www.w3.org/2000/svg"'
      );
    if (
      !svgString.match(
        /^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/
      )
    )
      svgString = svgString.replace(
        /^<svg/,
        '<svg xmlns:xlink="http://www.w3.org/1999/xlink"'
      );
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      if (mimeType !== "image/png") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const imgData = canvas.toDataURL(mimeType);
      const downloadLink = document.createElement("a");
      downloadLink.href = imgData;
      downloadLink.download = `qr-code.${extension}`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      title="Claim Link Modal"
    >
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
        title="Close modal"
      ></div>
      <div
        className="bg-white rounded-lg shadow-lg z-10 p-6 w-96"
        title="Generate Claim Link"
      >
        <h2
          className="text-xl font-semibold mb-4"
          title="Modal header"
        >
          Generate Claim Link
        </h2>
        <p
          className="mb-4 text-sm text-gray-600"
          title="Instructions"
        >
          Select the card from the dropdown below then click "Generate Link" or
          "Generate QR" to create a fresh claim URL.
        </p>
        <div className="mb-4">
          <label
            className="block mb-1 font-medium"
            title="Select card"
          >
            Select Card:
          </label>
          <select
            value={selectedCardId}
            onChange={(e) => setSelectedCardId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            title="Select card for claim link"
          >
            {cardRewards.length > 0 ? (
              cardRewards.map((reward) => (
                <option
                  key={reward.id}
                  value={reward.id}
                  title={String(reward.name)}
                >
                  {reward.name}
                </option>
              ))
            ) : (
              <option value="" title="No cards available">
                No cards available
              </option>
            )}
          </select>
        </div>
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={generatedLink}
              readOnly
              placeholder="Generated link will appear here"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              title="Claim link"
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg"
              onClick={onCopyLink}
              disabled={!generatedLink}
              title="Copy claim link to clipboard"
            >
              Copy
            </button>
          </div>
        </div>
        {generatedQRCode && (
          <div
            className="mb-4 flex flex-col items-center"
            title="QR Code section"
          >
            <p
              className="mb-2 text-sm text-gray-600"
              title="QR Code label"
            >
              QR Code:
            </p>
            <div ref={qrRef} title="QR Code">
              <QRCode value={generatedQRCode} size={128} />
            </div>
            <div
              className="mt-2 flex gap-2"
              title="Download QR Code options"
            >
              <button
                onClick={() => downloadQRAs("image/png", "png")}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                title="Download QR Code as PNG"
              >
                Download PNG
              </button>
              <button
                onClick={() => downloadQRAs("image/jpeg", "jpg")}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                title="Download QR Code as JPG"
              >
                Download JPG
              </button>
              <button
                onClick={() => downloadQRAs("image/webp", "webp")}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                title="Download QR Code as WEBP"
              >
                Download WEBP
              </button>
            </div>
          </div>
        )}
        <div
          className="flex justify-end gap-2"
          title="Modal actions"
        >
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
            title="Cancel and close modal"
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 ${
              isGenerating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={onGenerateClaim}
            disabled={isGenerating || !selectedCardId}
            title="Generate claim link"
          >
            {isGenerating ? "Generating..." : "Generate Link"}
          </button>
          <button
            className={`px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600 ${
              isGenerating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={onGenerateClaim}
            disabled={isGenerating || !selectedCardId}
            title="Generate QR code"
          >
            {isGenerating ? "Generating..." : "Generate QR"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimLinkModal;
