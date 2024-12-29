export const Creator = () => {
  const categories = [
    {name: "Art", icon: "🖌️"},
    {name: "Music", icon: "🎵"},
    {name: "Video", icon: "🎥"},
    {name: "Sport", icon: "🌐"},
    {name: "Collectibles", icon: "📦"},
    {name: "Photography", icon: "📷"},
    {name: "Utility", icon: "⚙️"},
    {name: "Virtual Worlds", icon: "🪐"},
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Categories</h1>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600">
            + Add Categories
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white shadow rounded-lg p-4"
            >
              {/* Icon and Name */}
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{category.icon}</span>
                <span className="text-lg font-medium text-gray-700">
                  {category.name}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button className="text-blue-500 hover:text-blue-600">
                  <i className="fas fa-link"></i>
                </button>
                <button className="text-gray-500 hover:text-gray-600">
                  <i className="fas fa-eye"></i>
                </button>
                <button className="text-red-500 hover:text-red-600">
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
