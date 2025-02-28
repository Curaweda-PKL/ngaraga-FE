import {useState} from "react";
import {CheckCircle2, Copy} from "lucide-react";
import {PaymentOverlay} from "./components/paymentModal";

const PaymentPage = () => {
  const [activeTab, setActiveTab] = useState("iBanking");

  const steps = [
    {number: 1, label: "Information", completed: true},
    {number: 2, label: "Payment", active: true},
    {number: 3, label: "Complete Order", completed: false},
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-full mx-auto">
      {/* Header - Payment */}
      <section className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold mb-4">Payment</h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-between md:justify-start md:gap-8 mb-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="flex flex-col md:flex-row md:items-center"
            >
              <div
                className={`
                  w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm
                  ${
                    step.completed
                      ? "bg-green-500"
                      : step.active
                      ? "bg-[#DDB11F]"
                      : "bg-gray-200"
                  }
                  text-white mb-1 md:mb-0
                `}
              >
                {step.completed ? (
                  <CheckCircle2
                    size={14}
                    className="md:w-5 md:h-5"
                  />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`text-xs md:text-sm md:ml-2 ${
                  step.active ? "font-semibold" : ""
                }`}
              >
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div className="hidden md:block mx-4 h-[2px] w-16 bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Main Content - Responsive Layout */}
      <div className="md:grid md:grid-cols-2 md:gap-8">
        {/* Left Column - Order Details (Mobile: Full width, Desktop: Left column) */}
        <div>
          {/* Order Details - Mobile: Stacked, Desktop: Left aligned */}
          <section className="mb-6">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Order ID</p>
              <p className="font-semibold">ORD123456789</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Payment</p>
              <p className="text-xl font-bold text-[#DDB11F]">Rp 460.650</p>
            </div>
          </section>
        </div>

        {/* Right Column - Timer (Mobile: Full width, Desktop: Right column) */}
        <div>
          {/* Payment Within Timer - Mobile: Full width, Desktop: Right aligned */}
          <section className="mb-6 md:text-right">
            <p className="text-sm text-gray-600 mb-2 md:mb-1">Payment Within</p>
            <div className="flex items-center justify-between md:justify-end md:gap-4 mb-1">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold">23</div>
                <div className="text-xs text-gray-500">Hours</div>
              </div>
              <div className="text-xl md:text-2xl font-bold">:</div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold">59</div>
                <div className="text-xs text-gray-500">Minutes</div>
              </div>
              <div className="text-xl md:text-2xl font-bold">:</div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold">39</div>
                <div className="text-xs text-gray-500">Seconds</div>
              </div>
            </div>
            <p className="text-xs text-gray-500">Due on 12 Dec 2024, 15:17</p>
          </section>
        </div>
      </div>

      {/* Bank Details Section */}
      <section className="mb-6">
        <div className="md:flex md:items-start md:justify-between">
          <div className="md:flex md:items-start md:gap-8">
            {/* Bank Logo and Name */}
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <img
                src="/api/placeholder/40/40"
                alt="BCA Logo"
                className="w-8 h-8"
              />
              <span className="font-semibold">Bank BCA</span>
            </div>

            {/* Account Details - Mobile: Stacked, Desktop: Side by side */}
            <div className="md:flex md:gap-8">
              <div className="mb-4 md:mb-0">
                <p className="text-xs text-gray-600 mb-1">
                  Virtual Account Name
                </p>
                <p className="font-semibold">Ngaraga</p>
              </div>

              <div className="mb-4 md:mb-0">
                <p className="text-xs text-gray-600 mb-1">
                  Virtual Account Number
                </p>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">1234 5678 9102</p>
                  <Copy
                    className="text-gray-400 cursor-pointer"
                    size={16}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Change Payment Button - Mobile: Full width, Desktop: Right aligned */}
          <button
            className="text-yellow-500 border border-[#DDB11F] rounded-lg px-4 py-2 w-full md:w-auto mb-6 md:mb-0"
            onClick={() => setIsModalOpen(true)}
          >
            Change Payment
          </button>
          {isModalOpen && (
            <PaymentOverlay onClose={() => setIsModalOpen(false)} />
          )}
        </div>
      </section>

      {/* Payment Methods Tabs */}
      <section>
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab("ATM")}
            className={`px-4 py-2 text-sm ${
              activeTab === "ATM"
                ? "border-b-2 border-[#DDB11F] font-semibold"
                : "text-gray-500"
            }`}
          >
            ATM
          </button>
          <button
            onClick={() => setActiveTab("iBanking")}
            className={`px-4 py-2 text-sm ${
              activeTab === "iBanking"
                ? "border-b-2 border-[#DDB11F] font-semibold"
                : "text-gray-500"
            }`}
          >
            iBanking
          </button>
          <button
            onClick={() => setActiveTab("mBanking")}
            className={`px-4 py-2 text-sm ${
              activeTab === "mBanking"
                ? "border-b-2 border-[#DDB11F] font-semibold"
                : "text-gray-500"
            }`}
          >
            mBanking
          </button>
        </div>

        {/* Instructions Based on Active Tab */}
        {activeTab === "ATM" && (
          <div>
            <button className="text-blue-500 text-sm mb-4">
              Find Nearest ATM
            </button>
            <div className="space-y-2 text-xs">
              <p>1. Insert your BCA ATM card and PIN</p>
              <p>2. Enter your ATM PIN</p>
              <p className="font-semibold mt-4">Payment Details</p>
              <p>1. Select Menu "Other Transaction"</p>
              <p>2. Select "Transfer"</p>
              <p>3. Select "To BCA Virtual Account"</p>
              <p>
                4. Enter Virtual Account Number{" "}
                <span className="text-[#DDB11F]">1234 5678 9102</span> Press
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
          <div>
            <p className="text-sm font-medium mb-2">Log In To Your Account</p>
            <div className="space-y-2 text-xs">
              <p>1. Login to KlikBCA Individual (https://ibank.klikbca.com)</p>
              <p>
                2. Select "Transfer", then select "Transfer to BCA Virtual
                Account"
              </p>
              <p className="font-semibold mt-4">Payment Details</p>
              <p>
                1. Enter the Virtual Account Number{" "}
                <span className="text-[#DDB11F]">1234 5678 9102</span>
              </p>
              <p>2. Select "Continue" to proceed your payment</p>
              <p>
                3. Enter "RESPON KEYBCA APPLI 1" shown in your BCA Token, then
                click on the "Send" button
              </p>
              <p>4. Enter the authentication token code</p>
            </div>
          </div>
        )}

        {activeTab === "mBanking" && (
          <div className="space-y-2 text-xs">
            <p>1. Open your mobile banking app</p>
            <p>2. Log in using your credentials</p>
            <p>3. Select "Transfer" or "Payments"</p>
            <p>4. Choose "BCA Virtual Account"</p>
            <p>
              5. Enter virtual account number{" "}
              <span className="text-[#DDB11F]">1234 5678 9102</span>
            </p>
            <p>6. Review and confirm the payment details</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default PaymentPage;
