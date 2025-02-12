import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SuccessRegist: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    // Attempt to get the email and name from localStorage first.
    const storedEmail = localStorage.getItem('userEmail');
    const storedName = localStorage.getItem('userName');

    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedName) {
      setName(storedName);
    }

    // If data isn't available in localStorage, fetch from the user profile API.
    if (!storedEmail || !storedName) {
      axios
        .get('http://localhost:3000/api/account/profile', { withCredentials: true })
        .then((response) => {
          if (response.data) {
            setEmail(response.data.email);
            // Prefer fullName if available; otherwise, fall back to name.
            setName(response.data.fullName || response.data.name || '');
          }
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
        });
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen break-words">
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="104"
          height="104"
          viewBox="0 0 104 104"
          fill="none"
          className="mx-auto"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.6945 88.1085H48.7139C49.7105 88.1085 50.5194 87.2904 50.5194 86.303C50.5194 85.3155 49.7105 84.4974 48.7139 84.4974H17.6945C14.708 84.4974 12.2779 82.0712 12.2779 79.0807V26.7196H91.7223V52.9848C91.7223 53.9722 92.5312 54.7904 93.5279 54.7904C94.5245 54.7904 95.3334 53.9722 95.3334 52.9848V17.6918C95.3334 12.6984 91.2855 8.66406 86.3056 8.66406H17.6945C12.7147 8.66406 8.66675 12.6984 8.66675 17.6918V79.0807C8.66675 84.0742 12.7147 88.1085 17.6945 88.1085ZM12.2779 23.1085V17.6918C12.2779 16.3095 12.7945 15.0399 13.6439 14.0807C14.101 13.5729 14.6547 13.1497 15.2758 12.8394C16.004 12.4727 16.8257 12.2752 17.6945 12.2752H86.3056C88.0706 12.2752 89.6413 13.1215 90.6309 14.4475C91.3159 15.3503 91.7223 16.4787 91.7223 17.6918V23.1085H12.2779Z"
            fill="#04805A"
          />
          <path
            d="M79.0834 41.1641H24.9167C23.9201 41.1641 23.1112 40.3459 23.1112 39.3585C23.1112 38.3711 23.9201 37.553 24.9167 37.553H79.0834C80.0801 37.553 80.889 38.3711 80.889 39.3585C80.889 40.3459 80.0801 41.1641 79.0834 41.1641Z"
            fill="#04805A"
          />
          <path
            d="M24.9167 55.6085H56.4055C57.4022 55.6085 58.2111 54.7904 58.2111 53.803C58.2111 52.8155 57.4022 51.9974 56.4055 51.9974H24.9167C23.9201 51.9974 23.1112 52.8155 23.1112 53.803C23.1112 54.7904 23.9201 55.6085 24.9167 55.6085Z"
            fill="#04805A"
          />
          <path
            d="M47.4862 70.053H24.9167C23.9201 70.053 23.1112 69.2348 23.1112 68.2474C23.1112 67.26 23.9201 66.4418 24.9167 66.4418H47.4862C47.9839 66.4418 48.4344 66.6393 48.761 66.9497L49.1242 67.4575C49.2318 67.7114 49.2918 67.9653 49.2918 68.2474C49.2918 68.6706 49.1489 69.0373 48.9096 69.3477C48.579 69.7708 48.0641 70.053 47.4862 70.053Z"
            fill="#04805A"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M55.6112 75.4696C55.6112 86.4158 64.5235 95.3307 75.4723 95.3307C86.4211 95.3307 95.3334 86.4158 95.3334 75.4696C95.3334 64.5234 86.4211 55.6085 75.4723 55.6085C64.5235 55.6085 55.6112 64.5234 55.6112 75.4696ZM59.2223 75.4696C59.2223 66.4983 66.5133 59.2196 75.4723 59.2196C84.4313 59.2196 91.7223 66.4983 91.7223 75.4696C91.7223 84.441 84.4313 91.7196 75.4723 91.7196C66.5133 91.7196 59.2223 84.441 59.2223 75.4696Z"
            fill="#04805A"
          />
          <path
            d="M73.5008 82.6865C73.0133 82.6865 72.5439 82.4879 72.2044 82.1377L66.9539 76.721C66.2641 76.006 66.2786 74.8613 66.9972 74.1679C67.7122 73.4782 68.8569 73.4927 69.5502 74.2113L73.4141 78.1979L81.3189 68.8849C81.9652 68.1229 83.1064 68.0327 83.8611 68.6754C84.623 69.3218 84.7133 70.4593 84.0705 71.2177L74.8766 82.051C74.548 82.4374 74.0677 82.6721 73.5622 82.6902C73.5405 82.6865 73.5225 82.6865 73.5008 82.6865Z"
            fill="#04805A"
          />
        </svg>

        <h1 className="text-2xl font-semibold mt-4">
          Thank You{ name ? `, ${name}` : '' }!
        </h1>
        <p className="mt-2 text-lg">
          Your registration for the event is complete. We’ve sent a confirmation to your email:
          <strong> {email}</strong>
        </p>
        <p className="mt-2 text-lg">See you there!</p>
      </div>
    </div>
  );
};

export default SuccessRegist;