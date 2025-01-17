import {useState} from "react";
import {CheckCircle2, Copy} from "lucide-react";

const PaymentPage = () => {
  const [activeTab, setActiveTab] = useState("ATM");

  const steps = [
    {number: 1, label: "Information", completed: true},
    {number: 2, label: "Payment", active: true},
    {number: 3, label: "Complete Order", completed: false},
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>

      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="flex items-center"
          >
            <div
              className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${
                step.completed
                  ? "bg-green-500"
                  : step.active
                  ? "bg-yellow-500"
                  : "bg-gray-200"
              }
              text-white
            `}
            >
              {step.completed ? <CheckCircle2 size={20} /> : step.number}
            </div>
            <span className={`ml-2 ${step.active ? "font-semibold" : ""}`}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className="mx-4 h-[2px] w-16 bg-gray-200"></div>
            )}
          </div>
        ))}
      </div>

      {/* Order Details */}
      <div className="mb-8">
        <p className="text-gray-600 mb-2">Order ID</p>
        <p className="text-lg font-semibold">ORD123456789</p>
      </div>

      {/* Timer */}
      <div className="mb-8">
        <div className="flex items-center justify-end gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">23</div>
            <div className="text-sm text-gray-500">Hours</div>
          </div>
          <div className="text-2xl font-bold">:</div>
          <div className="text-center">
            <div className="text-2xl font-bold">59</div>
            <div className="text-sm text-gray-500">Minutes</div>
          </div>
          <div className="text-2xl font-bold">:</div>
          <div className="text-center">
            <div className="text-2xl font-bold">39</div>
            <div className="text-sm text-gray-500">Seconds</div>
          </div>
        </div>
        <p className="text-right text-sm text-gray-500 mt-2">
          Due on 12 Dec 2024, 15:17
        </p>
      </div>

      {/* Total Payment */}
      <div className="mb-8">
        <p className="text-gray-600 mb-2">Total Payment</p>
        <p className="text-2xl font-bold text-yellow-500">Rp 460.650</p>
      </div>

      {/* Bank Details */}
      <div className="border rounded-lg p-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <img
              src="/api/placeholder/40/40"
              alt="BCA Logo"
              className="w-10 h-10"
            />
            <span className="font-semibold">Bank BCA</span>
          </div>
          <button className="text-yellow-500 border border-yellow-500 rounded-lg px-4 py-2">
            Change Payment
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-gray-600 text-sm">Virtual Account Name</p>
            <p className="font-semibold">Ngaraga</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Virtual Account Number</p>
            <div className="flex items-center gap-2">
              <p className="font-semibold">1234 5678 9102</p>
              <Copy
                className="text-gray-400 cursor-pointer"
                size={16}
              />
            </div>
          </div>
        </div>

        {/* Payment Methods Tabs */}
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab("ATM")}
            className={`px-4 py-2 ${
              activeTab === "ATM"
                ? "border-b-2 border-yellow-500 font-semibold"
                : "text-gray-500"
            }`}
          >
            ATM
          </button>
          <button
            onClick={() => setActiveTab("iBanking")}
            className={`px-4 py-2 ${
              activeTab === "iBanking"
                ? "border-b-2 border-yellow-500 font-semibold"
                : "text-gray-500"
            }`}
          >
            iBanking
          </button>
          <button
            onClick={() => setActiveTab("mBanking")}
            className={`px-4 py-2 ${
              activeTab === "mBanking"
                ? "border-b-2 border-yellow-500 font-semibold"
                : "text-gray-500"
            }`}
          >
            mBanking
          </button>
        </div>

        {/* Instructions Based on Active Tab */}
        {activeTab === "ATM" && (
          <div>
            <button className="text-blue-500 mb-4">Find Nearest ATM</button>
            <div className="space-y-2 text-sm">
              <p>1. Insert your BCA ATM card and PIN</p>
              <p>2. Enter your ATM PIN</p>
              <p className="font-semibold mt-4">Payment Details</p>
              <p>1. Select Menu "Other Transaction"</p>
              <p>2. Select "Transfer"</p>
              <p>3. Select "To BCA Virtual Account"</p>
              <p>
                4. Enter Virtual Account Number{" "}
                <span className="text-yellow-500">1234 5678 9102</span> Press
                "Correct" to proceed
              </p>
              <p>
                5. Verify Virtual Account details and then enter amount to be
                transferred and select "Correct" to confirm
              </p>
              <p>6. Confirm your transaction details displayed</p>
              <p>
                7. Select "Yes" if the details are correct or "No" if the
                details are not correct
              </p>
            </div>
          </div>
        )}

        {activeTab === "iBanking" && (
          <div className="space-y-2 text-sm">
            <p>1. Visit your bank's internet banking website</p>
            <p>2. Log in with your credentials</p>
            <p>3. Navigate to the payment or transfer section</p>
            <p>4. Choose "BCA Virtual Account"</p>
            <p>
              5. Enter the virtual account number{" "}
              <span className="text-yellow-500">1234 5678 9102</span>
            </p>
            <p>6. Confirm the details and proceed with the payment</p>
          </div>
        )}

        {activeTab === "mBanking" && (
          <div className="space-y-2 text-sm">
            <p>1. Open your mobile banking app</p>
            <p>2. Log in using your credentials</p>
            <p>3. Select "Transfer" or "Payments"</p>
            <p>4. Choose "BCA Virtual Account"</p>
            <p>
              5. Enter virtual account number{" "}
              <span className="text-yellow-500">1234 5678 9102</span>
            </p>
            <p>6. Review and confirm the payment details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
