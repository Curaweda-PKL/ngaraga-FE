import {Package, Truck, CreditCard, CheckCircle} from "lucide-react";

export default function Dashboard() {
  const statCards = [
    {
      label: "Revenue Today",
      value: "Rp 2.000.000",
    },
    {
      label: "Orders Today",
      value: "18",
    },
    {
      label: "Total Revenue",
      value: "Rp 5.000.000",
    },
    {
      label: "Total Orders",
      value: "131",
    },
  ];

  const statusCards = [
    {
      label: "Payment",
      value: "20",
      icon: CreditCard,
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      iconColor: "text-red-600",
    },
    {
      label: "Packaging",
      value: "8",
      icon: Package,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      iconColor: "text-yellow-600",
    },
    {
      label: "Shipping",
      value: "3",
      icon: Truck,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      iconColor: "text-blue-600",
    },
    {
      label: "Delivered",
      value: "100",
      icon: CheckCircle,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl mb-6">Hello, Animakid</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
          >
            <div className="text-sm text-gray-500 mb-2">{stat.label}</div>
            <div className="text-2xl font-semibold">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-4 gap-4">
        {statusCards.map((status, index) => (
          <div
            key={index}
            className={`${status.bgColor} rounded-2xl p-4 flex justify-between items-center`}
          >
            <div className="flex items-center gap-2">
              <status.icon className={`${status.iconColor} w-5 h-5`} />
              <span className={status.textColor}>{status.label}</span>
            </div>
            <span className={`${status.textColor} text-2xl font-semibold`}>
              {status.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
