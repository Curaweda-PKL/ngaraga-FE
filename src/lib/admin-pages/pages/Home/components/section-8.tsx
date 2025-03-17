import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { SERVER_URL } from "@/middleware/utils";

interface FormData {
  slug: string;
  title: string;
  description: string;
  image: File | null;
}

export const SectionEightForm = () => {
  const [formData, setFormData] = useState<FormData>({
    slug: "join-weekly",
    title: "",
    description: "",
    image: null,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClearField = (field: "title" | "description") => {
    setFormData((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async () => {
  setSuccessMessage("");
  setErrorMessage("");

  if (!formData.title) {
    setErrorMessage("Harap isi title.");
    return;
  }

  const formDataToSend = new FormData();
  formDataToSend.append("slug", formData.slug); // Pastikan slug dikirim
  formDataToSend.append("title", formData.title);
  formDataToSend.append("description", formData.description);
  if (formData.image) formDataToSend.append("image", formData.image);

  try {
    const response = await fetch(`${SERVER_URL}/api/join-weekly`, {
      method: "POST",
      body: formDataToSend,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal menyimpan data.");
    }

    const result = await response.json();
    setSuccessMessage(result.message || "Join Weekly Update saved successfully.");
    setFormData({
      slug: "join-weekly",
      title: "",
      description: "",
      image: null,
    });
  } catch (error) {
    console.error("Error:", error);
    setErrorMessage("Terjadi kesalahan saat menyimpan data.");
  }
};

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-medium mb-6">
        Section 8 - Join Weekly Update
      </h2>
      {successMessage && (
        <p className="text-green-600 mb-4">{successMessage}</p>
      )}

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Join our weekly update"
              className="w-full border rounded-lg px-4 py-2.5 pr-10"
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => handleClearField("title")}
            >
              <IoMdClose className="text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Enter description"
              className="w-full border rounded-lg px-4 py-2.5 pr-10"
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => handleClearField("description")}
            >
              <IoMdClose className="text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Image
        </label>
        <div className="relative border-dashed border-2 border-gray-300 rounded-lg p-4 bg-yellow-50">
          {formData.image ? (
            <div className="relative">
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Uploaded"
                className="w-full h-32 object-cover rounded"
              />
              <button
                onClick={() =>
                  setFormData((prev) => ({ ...prev, image: null }))
                }
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-gray-100"
              >
                <IoMdClose className="text-gray-600" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <input
                type="file"
                id="file-image"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label
                htmlFor="file-image"
                className="bg-call-to-action text-white px-4 py-1 rounded-md text-sm cursor-pointer inline-block"
              >
                Browse
              </label>
            </div>
          )}
        </div>
      </div>
      {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          className="bg-call-to-action text-white px-4 py-2 rounded-md hover:bg-call-to-action-dark"
        >
          Save
        </button>
      </div>
    </div>
  );
};
