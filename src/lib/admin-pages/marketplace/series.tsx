import {FiEdit2, FiEye, FiTrash2, FiSearch} from "react-icons/fi";

export const Series = () => {
  const seriesData = Array.from({length: 10}, (_, i) => ({
    master: `Master ${i + 1}`,
    series: `Series ${i + 1}`,
  }));

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <span>Marketplace</span>
        <span>/</span>
        <span className="text-gray-700">Series</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Series</h1>
        <div className="flex items-center gap-4">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <span className="text-xl">+</span> Add Series
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <FiSearch className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-medium">Master</th>
              <th className="text-left p-4 font-medium">Series</th>
              <th className="text-center p-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {seriesData.map((item, index) => (
              <tr
                key={index}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="p-4">{item.master}</td>
                <td className="p-4">{item.series}</td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FiEye className="w-5 h-5" />
                    </button>
                    <button className="text-red-400 hover:text-red-600">
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end p-4 border-t">
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center bg-yellow-500 text-white rounded">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded">
              3
            </button>
            <span className="text-gray-400">...</span>
            <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded">
              10
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
