import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';
import { zipSync } from 'fflate';
import { X } from 'lucide-react';
import { SERVER_URL } from "@/middleware/utils";

export interface QrCodeData {
  uniqueCode: string;
  qrCode: string; // Changed from claimUrl to qrCode
}

interface QrCodeGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStartCode?: string;
  initialEndCode?: string;
  productId?: number;
}

// Memoized QR code item to avoid unnecessary re-renders
const QrCodeItem: React.FC<{ code: QrCodeData; setRef: (ref: HTMLDivElement | null, uniqueCode: string) => void }> =
  React.memo(({ code, setRef }) => {
    return (
      <div
        className="bg-white p-2 rounded-md border flex flex-col items-center"
        ref={(el) => setRef(el, code.uniqueCode)}
      >
        <QRCode value={code.qrCode || ""} size={150} />
        <p className="font-bold text-center mt-2 text-gray-800">{code.uniqueCode}</p>
      </div>
    );
  });

export const QrCodeGeneratorModal: React.FC<QrCodeGeneratorModalProps> = ({
  isOpen,
  onClose,
  initialStartCode = '123-789-456-00001-00003',
  initialEndCode = '',
  productId
}) => {
  const [startPrefix, setStartPrefix] = useState<string>('');
  const [startSerial, setStartSerial] = useState<string>('');
  const [endSerial, setEndSerial] = useState<string>('');
  const [qrCodes, setQrCodes] = useState<QrCodeData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const qrCodeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (isOpen) {
      if (initialStartCode) {
        const parts = initialStartCode.split('-');
        if (parts.length === 5) {
          const prefix = parts.slice(0, 4).join('-') + '-';
          const serial = parts[4];
          setStartPrefix(prefix);
          setStartSerial(serial);
          setEndSerial(initialEndCode ? initialEndCode.split('-').pop() || serial : serial);
        } else {
          const prefix = initialStartCode.slice(0, initialStartCode.length - 5);
          const serial = initialStartCode.slice(-5);
          setStartPrefix(prefix);
          setStartSerial(serial);
          setEndSerial(initialEndCode ? initialEndCode.slice(-5) : serial);
        }
      } else {
        setStartPrefix('');
        setStartSerial('');
        setEndSerial('');
      }
      setQrCodes([]);
      setErrorMessage('');
    }
  }, [isOpen, initialStartCode, initialEndCode]);

  const fullStartCode = useMemo(() => startPrefix + startSerial, [startPrefix, startSerial]);
  const fullEndCode = useMemo(() => startPrefix + endSerial, [startPrefix, endSerial]);

  const codeFormatRegex = /^\d{3}-\d{3}-\d{3}-\d{5}-\d{5}$/;
  const serialRegex = /^\d{5}$/;

  const handleStartSerialChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    if (/^\d{0,5}$/.test(newVal)) {
      setStartSerial(newVal);
    }
  }, []);

  const handleEndSerialChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    if (/^\d{0,5}$/.test(newVal)) {
      setEndSerial(newVal);
    }
  }, []);

  // Sends productId along with startSerial and endSerial
  const generateQRCode = useCallback(async () => {
    if (!codeFormatRegex.test(fullStartCode)) {
      setErrorMessage('Start Unique Code must follow format xxx-xxx-xxx-xxxxx-xxxxx.');
      return;
    }
    if (!serialRegex.test(endSerial)) {
      setErrorMessage('Serial number (last 5 digits) must be exactly 5 digits.');
      return;
    }
    if (!productId) {
      setErrorMessage('Product ID is missing.');
      return;
    }

    setErrorMessage('');
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/admin/generate-qrs`,
        {
          productId,
          startSerial,
          endSerial,
          cardType: "NORMAL"
        },
        { withCredentials: true }
      );
      if (response.data.cards && response.data.cards.length > 0) {
        setQrCodes(response.data.cards);
        console.log(response.data.message);
      } else {
        setErrorMessage("Server did not return any QR codes.");
      }
    } catch (error: any) {
      console.error("Error generating QR codes:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || error.message || "Error generating QR codes");
    }
  }, [fullStartCode, endSerial, startSerial, productId]);

  // Download generated QR codes as PNG images in a ZIP file.
  const downloadZip = useCallback(async () => {
    const files: Record<string, Uint8Array> = {};
  
    await Promise.all(
      qrCodes.map(async (code) => {
        const container = qrCodeRefs.current[code.uniqueCode];
        if (container) {
          const svgElement = container.querySelector('svg');
          if (svgElement) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const serializer = new XMLSerializer();
            const svgString = serializer.serializeToString(svgElement);
            const img = new Image();
            const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(svgBlob);
  
            await new Promise<void>((resolve) => {
              img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);
                URL.revokeObjectURL(url);
                resolve();
              };
              img.src = url;
            });
  
            // Convert canvas to PNG and store in zip
            const blob = await new Promise<Blob | null>((resolve) =>
              canvas.toBlob((b) => resolve(b), 'image/png')
            );
  
            if (blob) {
              const arrayBuffer = await blob.arrayBuffer();
              files[`${code.uniqueCode}.png`] = new Uint8Array(arrayBuffer);
            }
          }
        }
      })
    );
  
    const zipped = zipSync(files);
    const blob = new Blob([zipped], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qr_codes.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [qrCodes]);
  
  const setQrCodeRef = useCallback((el: HTMLDivElement | null, uniqueCode: string) => {
    qrCodeRefs.current[uniqueCode] = el;
  }, []);

  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-sans"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-3xl relative text-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-1">Mass QR Code Generator</h2>
        <p className="mb-4 text-sm text-gray-700">
          Note: The prefix cannot be changed; only the last 5-digit serial code can be edited.
        </p>
        <div className="flex flex-col gap-4">
          <label className="form-control">
            <span className="label-text text-gray-800">Start Unique Code</span>
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={startPrefix}
                disabled
                className="input input-bordered text-gray-800 bg-gray-100 w-auto"
              />
              <input
                type="text"
                value={startSerial}
                onChange={handleStartSerialChange}
                className="input input-bordered text-gray-800 w-20"
                placeholder="00000"
              />
            </div>
          </label>
          <label className="form-control">
            <span className="label-text text-gray-800">End Unique Code</span>
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={startPrefix}
                disabled
                className="input input-bordered text-gray-800 bg-gray-100 w-auto"
              />
              <input
                type="text"
                value={endSerial}
                onChange={handleEndSerialChange}
                className="input input-bordered text-gray-800 w-20"
                placeholder="00000"
              />
            </div>
          </label>
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          <div className="flex gap-3">
            <button onClick={generateQRCode} className="btn bg-blue-600 hover:bg-blue-700 text-white">
              Generate QR Code
            </button>
            {qrCodes.length > 0 && (
              <button onClick={downloadZip} className="btn bg-green-600 hover:bg-green-700 text-white">
                Download ZIP
              </button>
            )}
          </div>
        </div>
        <div className="mt-6 max-h-96 overflow-y-auto">
          <div className="qr-codes grid grid-cols-2 md:grid-cols-3 gap-4">
            {qrCodes.map((code) => (
              <QrCodeItem key={code.uniqueCode} code={code} setRef={setQrCodeRef} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
