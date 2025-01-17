import React, {useState} from "react";

export const SignUpPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("Welcome back!");
  const [description, setDescription] = useState(
    "Enter your details to access your account and continue your journey of creating and collecting Cards."
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleUpdate = () => {
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Image:", image);
    alert("Details updated successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>

      {/* Image Upload Section */}
      <div className="grid grid-cols-2 gap-4 items-start mb-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Sign Up Image <span className="text-red-500">*</span>
          </label>
          <div className="border-dashed border-2 border-yellow-500 rounded-lg p-4 text-center bg-yellow-50">
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
                    <span
                      role="img"
                      aria-label="delete"
                    >
                      🗑️
                    </span>
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
                <p className="text-sm text-gray-500 mt-2">
                  Click to Upload or Drag & Drop
                  <br />
                  jpeg, jpg, png max 4mb
                </p>
              </>
            )}
          </div>
        </div>

        {/* Preview Section */}
        <div className="flex justify-center items-center">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-48 h-48 object-cover rounded-md shadow"
            />
          ) : (
            <div className="text-gray-500 text-sm">
              Image preview will appear here.
            </div>
          )}
        </div>
      </div>

      {/* Title and Description Section */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Sign Up Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Sign Up Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded text-gray-700"
          onClick={() => console.log("Cancel clicked")}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
};
