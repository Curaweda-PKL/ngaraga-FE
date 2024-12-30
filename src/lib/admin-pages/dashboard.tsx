import {useState} from "react";
import ReactApexChart from "react-apexcharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Package, Truck, CreditCard, CheckCircle} from "lucide-react";
import {ApexOptions} from "apexcharts";

const statCards = [
  {
    title: "Revenue Today",
    value: "Rp 2.000.000",
  },
  {
    title: "Orders Today",
    value: "18",
  },
  {
    title: "Total Revenue",
    value: "Rp 5.000.000",
  },
  {
    title: "Total Orders",
    value: "131",
  },
];

const statusCards = [
  {
    label: "Payment",
    value: "20",
    icon: CreditCard,
    color: "rgb(254, 226, 226)",
    textColor: "rgb(185, 28, 28)",
  },
  {
    label: "Packaging",
    value: "8",
    icon: Package,
    color: "rgb(254, 249, 195)",
    textColor: "rgb(161, 98, 7)",
  },
  {
    label: "Shipping",
    value: "3",
    icon: Truck,
    color: "rgb(219, 234, 254)",
    textColor: "rgb(29, 78, 216)",
  },
  {
    label: "Delivered",
    value: "100",
    icon: CheckCircle,
    color: "rgb(220, 252, 231)",
    textColor: "rgb(21, 128, 61)",
  },
];

const metricCards = [
  {
    label: "New Customers",
    value: "24",
    trend: "-10%",
    trendPeriod: "Last 7 Days",
    trendColor: "text-red-500",
  },
  {
    label: "Orders",
    value: "30",
    trend: "+30%",
    trendPeriod: "Last 7 Days",
    trendColor: "text-green-500",
  },
  {
    label: "Revenue",
    value: "Rp 3.000.000",
    trend: "+40%",
    trendPeriod: "Last 7 Days",
    trendColor: "text-green-500",
  },
];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("7 Days");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const handleDateChange = (date: Date | null, dateType: "start" | "end") => {
    if (dateType === "start") {
      setStartDate(date || undefined);
    } else {
      setEndDate(date || undefined);
    }
  };

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    const now = new Date();
    let start: Date | undefined;
    let end: Date | undefined = now;

    switch (range) {
      case "7 Days":
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "30 Days":
        start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "1 Year":
        start = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        start = undefined;
        end = undefined;
    }

    setStartDate(start);
    setEndDate(end);
  };

  const chartOptions: ApexOptions = {
    chart: {
      type: "area" as const,
      height: 350,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
    yaxis: {
      labels: {
        formatter: function (value: number): string {
          return value + "%";
        },
      },
    },
    colors: ["#60A5FA", "#34D399", "#FBBF24"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [50, 100],
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
  };

  const series = [
    {
      name: "Revenue",
      data: [10, 15, 12, 25, 30, 35, 40],
    },
    {
      name: "Orders",
      data: [15, 20, 25, 35, 40, 45, 50],
    },
    {
      name: "Profit",
      data: [35, 40, 45, 50, 55, 60, 65],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-lg p-4 shadow-sm border"
          >
            <h3 className="text-sm text-gray-500 mb-2">{stat.title}</h3>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-4 gap-4">
        {statusCards.map((status, i) => (
          <div
            key={i}
            className="p-4 rounded-lg flex justify-between items-center"
            style={{backgroundColor: status.color}}
          >
            <div className="flex items-center gap-2">
              <status.icon
                size={20}
                style={{color: status.textColor}}
              />
              <span style={{color: status.textColor}}>{status.label}</span>
            </div>
            <span
              className="text-2xl font-bold"
              style={{color: status.textColor}}
            >
              {status.value}
            </span>
          </div>
        ))}
      </div>

      {/* Chart and Metrics Section */}
      <div className="grid grid-cols-3 gap-4">
        {/* Chart Section */}
        <div className="col-span-2 bg-white rounded-lg p-6 border">
          {/* Date Filter Section */}
          <div className="flex flex-col gap-4 mb-6">
            {/* Quick Filter Buttons */}
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">Quick Filter:</h2>
              <div className="flex gap-2">
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    timeRange === "7 Days"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => handleTimeRangeChange("7 Days")}
                >
                  7 Days
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    timeRange === "30 Days"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => handleTimeRangeChange("30 Days")}
                >
                  30 Days
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    timeRange === "1 Year"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => handleTimeRangeChange("1 Year")}
                >
                  1 Year
                </button>
              </div>
            </div>

            {/* Custom Date Range */}
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">Custom Range:</h2>
              <div className="flex items-center gap-2">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) =>
                    handleDateChange(date, "start")
                  }
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="From"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5"
                />
                <span className="text-gray-500">-</span>
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date | null) =>
                    handleDateChange(date, "end")
                  }
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="To"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5"
                />
              </div>
            </div>
          </div>

          {/* Chart */}
          <ReactApexChart
            options={chartOptions}
            series={series}
            type="area"
            height={350}
          />
        </div>

        {/* Metrics Section */}
        <div className="col-span-1 grid gap-4">
          {metricCards.map((metric, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-4 border"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500">{metric.label}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-2xl font-bold">{metric.value}</span>
                <div className="text-right">
                  <div className={`${metric.trendColor} font-medium`}>
                    {metric.trend}
                  </div>
                  <div className="text-sm text-gray-500">
                    {metric.trendPeriod}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
