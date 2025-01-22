import {useEffect, useState} from "react";
import {X, Pencil, Eye, Trash2, Plus, Search} from "lucide-react";
import axios from "axios";

export const Creator = () => {
  const [image, setImage] = useState<File | null>(null);
  const [creatorName, setCreatorName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creators, setCreators] = useState<any[]>([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/creator/all"
        );
        setCreators(response.data.creators);
      } catch (error) {
        console.error("Error fetching creators:", error);
      }
    };

    fetchCreators();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSave = async () => {
    if (!image || !creatorName) {
      alert("Please upload an image and provide a creator name.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", creatorName);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/creator/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.message === "Creator created successfully") {
        alert("Creator created successfully!");
        setIsModalOpen(false); // Close the modal after success
      } else {
        alert("Failed to create creator.");
      }
    } catch (error) {
      console.error("Error creating creator:", error);
      alert("An error occurred while creating the creator.");
    }
  };

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>Creator</span>
        <span>/</span>
        <span className="text-gray-700">Creator List</span>
      </div>

      {/* Header */}
      <h1 className="text-2xl font-semibold mb-4">Creator</h1>

      {/* Action Bar */}
      <div className="flex justify-between items-center mb-6">
        {/* Add Creator Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Creator</span>
        </button>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
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
              {/* Image is fetched dynamically from the server */}
              <img
                src={`http://localhost:3000/uploads/creator/${creator.image}`} // Assuming the image path is correct
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

      {/* Add Creator Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-medium">Add Creator</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Creator Image*
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <div className="text-center">
                      {image ? (
                        <div className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Uploaded"
                            className="w-full h-48 object-cover rounded"
                          />
                          <div className="absolute top-2 right-2 flex space-x-2">
                            <button
                              onClick={handleRemoveImage}
                              className="p-2 bg-red-500 text-white rounded-full"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleImageChange}
                            className="hidden"
                            id="image-upload"
                          />
                          <label
                            htmlFor="image-upload"
                            className="cursor-pointer px-4 py-2 bg-yellow-500 text-white rounded"
                          >
                            Browse
                          </label>
                          <p className="mt-2 text-sm text-red-500">
                            Click to Upload
                          </p>
                          <p className="text-xs text-gray-500">
                            jpeg, jpg, png max 4mb
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Creator Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Creator Name*
                  </label>
                  <input
                    type="text"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 p-4 border-t">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
