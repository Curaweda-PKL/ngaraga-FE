import React, { useState } from 'react';

const QrCodeComponent: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  const handleBackClick = () => {
    window.history.back();
  };

  const handleProfileClick = () => {
    window.location.href = '/account';
  };

  const handleQrClick = () => {
    setMessage('QR Code clicked');
    console.log('QR Code clicked');
  };

  const handleOtherClick = () => {
    setMessage('Other action clicked');
    console.log('Other action clicked');
  };

  return (
    <div>
      {/* Outer container */}
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
              <svg
                onClick={handleBackClick}
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 p-2 cursor-pointer hover:bg-gray-500 text-gray-50 rounded-full mr-3"
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
              <svg
                onClick={handleProfileClick}
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 p-2 cursor-pointer hover:bg-gray-500 text-gray-50 rounded-full"
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
            {/* Footer action icons */}
            <div className="mt-5 w-full flex items-center justify-between space-x-3 my-3 absolute bottom-0 left-0 px-2">
              <div className="flex">
                <svg
                  onClick={handleQrClick}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 p-2 cursor-pointer hover:bg-gray-600 text-gray-50 rounded-full"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-0">
                <svg
                  onClick={handleOtherClick}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 p-2 cursor-pointer hover:bg-gray-600 text-gray-50 rounded-full"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        .shadow-out {
          box-shadow: rgba(17, 24, 39, 0.2) 0px 7px 29px 0px;
        }
      `}</style>
    </div>
  );
};

export default QrCodeComponent;
