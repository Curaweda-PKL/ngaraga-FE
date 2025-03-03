import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-scanner';

const QrCodeComponent: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [cameraDenied, setCameraDenied] = useState<boolean>(false);
  // Used to force re-mounting the QrReader to re-request camera access.
  const [qrReaderKey, setQrReaderKey] = useState<number>(0);
  // Countdown in seconds before redirecting to /account.
  const [countdown, setCountdown] = useState<number>(10);

  // Called when a QR code is scanned successfully.
  const handleScan = (data: any) => {
    if (data && data.text) {
      const scannedText = data.text;
      setScannedData(scannedText);
      setMessage('QR Code scanned. Redirecting to account...');
      console.log('QR Code scanned:', scannedText);
      window.location.href = '/account';
    }
  };

  // Called if an error occurs during scanning.
  const handleError = (err: any) => {
    // Only log the error once.
    if (!cameraDenied) {
      console.error(err);
    }
    // Check for permission-related errors.
    if (err && (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError')) {
      if (!cameraDenied) {
        setCameraDenied(true);
        setMessage('Camera access is required. Please allow access in your browser settings.');
        setCountdown(10);
      }
    } else {
      setMessage('Error scanning QR Code');
      setTimeout(() => {
        window.location.href = '/account';
      }, 3000);
    }
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  // When camera access is denied, re-mount QrReader every 5 seconds to re-trigger the permission request.
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (cameraDenied) {
      interval = setInterval(() => {
        setQrReaderKey(prev => prev + 1);
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [cameraDenied]);

  // Countdown effect: every second decrease the countdown and redirect if it reaches 0.
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cameraDenied && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (cameraDenied && countdown <= 0) {
      window.location.href = '/account';
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [cameraDenied, countdown]);

  // Function to manually retry re-mounting the QrReader and reset the countdown.
  const handleRetry = () => {
    setQrReaderKey(prev => prev + 1);
    setCountdown(10);
    setMessage('Retrying camera permission...');
  };

  return (
    <div>
      {/* Main container */}
      <div
        className="min-w-screen h-screen fixed left-0 top-0 flex justify-center items-center inset-0 z-50 bg-green-100 overflow-y-scroll bg-cover"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1628254747021-59531f59504b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80)',
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute bg-gradient-to-tl from-indigo-600 to-green-600 opacity-80 inset-0"></div>
        {/* Main card */}
        <div
          className="relative border-8 overflow-hidden border-gray-900 bg-gray-900 h-4/6 sm:h-3/5 rounded-3xl flex flex-col w-64 justify-center items-center bg-no-repeat bg-cover shadow-2xl"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1590520181753-3fff75292722?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80)',
          }}
        >
          {/* Dark overlay */}
          <div className="absolute bg-black opacity-60 inset-0"></div>
          {/* Camera icon (purely decorative) */}
          <div className="camera absolute top-4"></div>
          {/* Header with navigation icons */}
          <div className="flex w-full flex-row justify-between items-center mb-2 px-2 text-gray-50 z-10 absolute top-7">
            <div className="flex flex-row items-center">
              {/* Back button removed */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 p-2 text-gray-50 rounded-full mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="text-sm">QR Code</span>
            </div>
            <div>
              {/* Profile icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 p-2 text-gray-50 rounded-full"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          {/* Central content */}
          <div className="text-center z-10">
            <div>
              <div
                className="relative border-corner p-5 m-auto rounded-xl bg-cover w-48 h-48 flex"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1590520181753-3fff75292722?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80)',
                }}
              >
                <span className="border_bottom"></span>
              </div>
            </div>
            <p className="text-gray-300 text-xs mt-3">Scan a QR Code</p>
            {/* Footer actions removed */}
            <div className="mt-5 w-full flex items-center justify-between space-x-3 my-3 absolute bottom-0 left-0 px-2"></div>
          </div>
        </div>
      </div>
      {/* QR Scanner Overlay – always visible */}
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50">
        <div className="relative w-80 h-80">
          <QrReader
            key={qrReaderKey}
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={previewStyle}
          />
          {/* Close button removed */}
        </div>
      </div>
      {/* Popup notification when camera is denied */}
      {cameraDenied && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-red-700 bg-opacity-75 z-60">
          <div className="bg-white p-4 rounded shadow-md text-center">
            <p className="text-gray-800 mb-2">
              Camera access is required. Please allow access in your browser settings.
            </p>
            <p className="text-gray-800 text-xs mb-2">
              Redirecting to your account in {countdown} second{countdown !== 1 && 's'}...
            </p>
            <button
              onClick={handleRetry}
              className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      {/* Optional message display */}
      {message && (
        <div className="fixed bottom-4 left-4 bg-gray-800 text-white px-4 py-2 rounded">
          {message}
        </div>
      )}
      {/* Custom styles */}
      <style>{`
        .border-corner:before {
          display: block;
          content: "";
          width: 40px;
          height: 40px;
          position: absolute;
          top: 0;
          left: 0;
          border-top: 5px solid #0ed3cf;
          border-left: 5px solid #0ed3cf;
          border-radius: 12px 0;
        }
        .border-corner:after {
          display: block;
          content: "";
          width: 40px;
          height: 40px;
          position: absolute;
          top: 0;
          right: 0;
          border-top: 5px solid #0ed3cf;
          border-right: 5px solid #0ed3cf;
          border-radius: 0 12px;
        }
        .border-corner span.border_bottom:before {
          display: block;
          content: "";
          width: 40px;
          height: 40px;
          position: absolute;
          bottom: 0;
          left: 0;
          border-bottom: 5px solid #0ed3cf;
          border-left: 5px solid #0ed3cf;
          border-radius: 0 12px;
        }
        .border-corner span.border_bottom:after {
          display: block;
          content: "";
          width: 40px;
          height: 40px;
          position: absolute;
          bottom: 0;
          right: 0;
          border-bottom: 5px solid #0ed3cf;
          border-right: 5px solid #0ed3cf;
          border-radius: 12px 0;
        }
        .camera {
          z-index: 11;
        }
        .camera::before {
          content: "";
          position: absolute;
          top: 15%;
          left: 50%;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          border: solid 2px #2c303a;
        }
      `}</style>
    </div>
  );
};

export default QrCodeComponent;
