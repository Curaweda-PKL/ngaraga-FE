import React, {useState} from "react";
import {SiShopee, SiGojek} from "react-icons/si";
import {BsBank, BsWallet2} from "react-icons/bs";

interface PaymentMethod {
  id: number;
  name: string;
  icon: JSX.Element;
  isActive: boolean;
}

export const Payment: React.FC = () => {
  const initialPayments: PaymentMethod[] = [
    {
      id: 1,
      name: "Bank BCA",
      icon: <BsBank className="w-6 h-6" />,
      isActive: true,
    },
    {
      id: 2,
      name: "Bank BNI",
      icon: <BsBank className="w-6 h-6" />,
      isActive: true,
    },
    {
      id: 3,
      name: "Bank BRI",
      icon: <BsBank className="w-6 h-6" />,
      isActive: true,
    },
    {
      id: 4,
      name: "Bank BSI",
      icon: <BsBank className="w-6 h-6" />,
      isActive: true,
    },
    {
      id: 5,
      name: "Bank Mandiri",
      icon: <BsBank className="w-6 h-6" />,
      isActive: true,
    },
    {
      id: 6,
      name: "Qris",
      icon: <BsWallet2 className="w-6 h-6" />,
      isActive: true,
    },
    {
      id: 7,
      name: "Dana",
      icon: <BsWallet2 className="w-6 h-6" />,
      isActive: true,
    },
    {
      id: 8,
      name: "Ovo",
      icon: <BsWallet2 className="w-6 h-6" />,
      isActive: true,
    },
    {
      id: 9,
      name: "Gopay",
      icon: <SiGojek className="w-6 h-6" />,
      isActive: true,
    },
    {
      id: 10,
      name: "Shopee Pay",
      icon: <SiShopee className="w-6 h-6" />,
      isActive: false,
    },
  ];

  const [payments, setPayments] = useState<PaymentMethod[]>(initialPayments);

  const handleToggle = (id: number) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.id === id ? {...payment, isActive: !payment.isActive} : payment
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">Payment / Payment List</div>

        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Payment</h1>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Icon and Name */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
                  {payment.icon}
                </div>
                <span className="text-gray-700 font-medium">
                  {payment.name}
                </span>
              </div>

              {/* Toggle Button */}
              <div
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
                  payment.isActive ? "bg-yellow-500" : "bg-gray-200"
                }`}
                onClick={() => handleToggle(payment.id)}
                role="switch"
                aria-checked={payment.isActive}
                tabIndex={0}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                    payment.isActive ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
