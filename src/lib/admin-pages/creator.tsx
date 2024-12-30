import {Pencil, Eye, Trash2} from "lucide-react";

export const Creator = () => {
  const creators = [
    {name: "Astrovia", avatar: "/api/placeholder/40/40"},
    {name: "Stellaris", avatar: "/api/placeholder/40/40"},
    {name: "Galactica", avatar: "/api/placeholder/40/40"},
    {name: "Cosmara", avatar: "/api/placeholder/40/40"},
    {name: "Nebulon", avatar: "/api/placeholder/40/40"},
    {name: "Galactica", avatar: "/api/placeholder/40/40"},
  ];

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>Creator</span>
        <span>/</span>
        <span className="text-gray-700">Creator List</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Creator</h1>
        <div className="flex gap-4">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <span className="text-xl font-bold">+</span> Add Creator
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Creator Grid */}
      <div className="grid grid-cols-2 gap-4">
        {creators.map((creator, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-10 h-10 rounded-lg"
              />
              <span className="font-medium">{creator.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-gray-600">
                <Pencil className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <Eye className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
