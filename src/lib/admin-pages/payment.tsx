// Payment.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils";
import { BsBank, BsWallet2 } from "react-icons/bs";

// Define the PaymentMethod interface based on your backend schema
interface PaymentMethodType {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const Payment = () => {
  const [payments, setPayments] = useState<PaymentMethodType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch payment methods from the backend
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<PaymentMethodType[]>(
          `${SERVER_URL}/api/payment-method`
        );
        setPayments(data);
      } catch (err) {
        console.error("Error fetching payment methods:", err);
        setError("Failed to fetch payment methods.");
      } finally {
        setLoading(false);
      }
    };
    fetchPaymentMethods();
  }, []);

  // Toggle isActive state and update on the backend
  const handleToggle = async (id: string, currentStatus: boolean) => {
    try {
      const updatedStatus = !currentStatus;
      await axios.put(`${SERVER_URL}/api/payment-method/${id}`, {
        isActive: updatedStatus,
      });
      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment.id === id ? { ...payment, isActive: updatedStatus } : payment
        )
      );
      setNotification("Payment method updated successfully.");
      // Clear notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      console.error("Error updating payment method:", err);
      setError("Failed to update payment method.");
    }
  };

  if (loading) {
    return <div>Loading payment methods...</div>;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">Payment / Payment List</div>

        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Payment</h1>

        {/* Notification Message */}
        {notification && (
          <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
            {notification}
          </div>
        )}
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
            {error}
          </div>
        )}

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
                  {payment.imageUrl ? (
                    <img
                      src={payment.imageUrl}
                      alt={payment.name}
                      className="w-6 h-6"
                    />
                  ) : payment.type === "QRIS" ? (
                    <BsWallet2 className="w-6 h-6" />
                  ) : (
                    <BsBank className="w-6 h-6" />
                  )}
                </div>
                <span className="text-gray-700 font-medium">
                  {payment.name}
                </span>
              </div>

              {/* Toggle Button */}
              <div
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
                  payment.isActive ? "bg-call-to-action" : "bg-gray-200"
                }`}
                onClick={() => handleToggle(payment.id, payment.isActive)}
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

export default Payment;
