import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'react-qr-code';
import { zipSync } from 'fflate';
import { X } from 'lucide-react';

interface QrCodeGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrCodeGeneratorModal: React.FC<QrCodeGeneratorModalProps> = ({ isOpen, onClose }) => {
  const [startCode, setStartCode] = useState('');
  const [endCode, setEndCode] = useState('');
  const [qrCodes, setQrCodes] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  // Use a ref to store div elements that wrap the SVGs rendered by react-qr-code
  const qrCodeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Regex to validate input format: xxx-xxx-xxx-xxxx-xxxxxx
  const codeFormatRegex = /^\d{3}-\d{3}-\d{3}-\d{4}-\d{6}$/;

  // When the modal opens, fetch the unique code from the API endpoint and set it as the start code.
  useEffect(() => {
    if (isOpen) {
      fetch('http://localhost:3000/api/cards/all')
        .then((res) => res.json())
        .then((data) => {
          if (data && data.cards && data.cards.length > 0) {
            setStartCode(data.cards[0].uniqueCode);
          }
        })
        .catch((err) => {
          console.error('Error fetching unique code:', err);
        });
    }
  }, [isOpen]);

  const generateQRCode = () => {
    if (!codeFormatRegex.test(startCode) || !codeFormatRegex.test(endCode)) {
      setErrorMessage('Input harus mengikuti format xxx-xxx-xxx-xxxx-xxxxxx.');
      return;
    }
    setErrorMessage('');
    const startParts = startCode.split('-');
    const endParts = endCode.split('-');
    const start = parseInt(startParts[startParts.length - 1]);
    const end = parseInt(endParts[endParts.length - 1]);

    if (end < start) {
      alert('Kode akhir harus lebih besar dari kode awal.');
      return;
    }

    const codes: string[] = [];
    for (let i = start; i <= end; i++) {
      const formattedCode = `${startParts.slice(0, -1).join('-')}-${String(i).padStart(6, '0')}`;
      codes.push(formattedCode);
    }
    setQrCodes(codes);
  };

  const downloadZip = async () => {
    const files: Record<string, Uint8Array> = {};

    await Promise.all(
      qrCodes.map(async (code) => {
        const container = qrCodeRefs.current[code];
        if (container) {
          const svgElement = container.querySelector('svg');
          if (svgElement) {
            const serializer = new XMLSerializer();
            const svgString = serializer.serializeToString(svgElement);
            // Convert the SVG string into a Uint8Array
            const uint8Array = new TextEncoder().encode(svgString);
            files[`${code}.svg`] = uint8Array;
          }
        }
      })
    );

    // Create the zip file using fflate
    const zipped = zipSync(files);
    const blob = new Blob([zipped], { type: 'application/zip' });

    // Trigger download using native browser APIs
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qr_codes.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 right-2">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold mb-4">Generator QR Code Masal</h2>
        <div className="flex flex-col gap-4">
          <label className="form-control">
            <span className="label-text">Start Unique Code</span>
            <input
              type="text"
              placeholder="xxx-xxx-xxx-xxxx-xxxxxx"
              value={startCode}
              onChange={(e) => setStartCode(e.target.value)}
              className="input input-bordered"
            />
          </label>
          <label className="form-control">
            <span className="label-text">End Unique Code</span>
            <input
              type="text"
              placeholder="xxx-xxx-xxx-xxxx-xxxxxx"
              value={endCode}
              onChange={(e) => setEndCode(e.target.value)}
              className="input input-bordered"
            />
          </label>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="flex gap-3">
            <button onClick={generateQRCode} className="btn btn-primary">
              Generate QR Codes
            </button>
            {qrCodes.length > 0 && (
              <button onClick={downloadZip} className="btn btn-primary">
                Download ZIP of QR Codes
              </button>
            )}
          </div>
        </div>
        <div className="qr-codes grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {qrCodes.map((code, index) => (
            <div
              key={index}
              className="bg-white p-2 rounded-md border flex flex-col items-center"
              ref={(el) => {
                if (el) qrCodeRefs.current[code] = el;
              }}
            >
              <QRCode value={code} size={150} />
              <p className="font-bold text-center mt-2">{code}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
