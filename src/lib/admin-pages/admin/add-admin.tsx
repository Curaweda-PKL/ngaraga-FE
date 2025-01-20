import { useRef, useState, useEffect } from "react";

export const AddAdmin = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    bio: "",
    website: "",
    discord: "",
    youtube: "",
    twitter: "",
    instagram: "",
    password: "",
    confirmPassword: "",
  });

  const CancelClearFormData = {
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    bio: "",
    website: "",
    discord: "",
    youtube: "",
    twitter: "",
    instagram: "",
    password: "",
    confirmPassword: "",
  };

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Load data from localStorage if available
  useEffect(() => {
    const savedData = localStorage.getItem("addAdminForm");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever form data changes
  useEffect(() => {
    localStorage.setItem("addAdminForm", JSON.stringify(formData));
  }, [formData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare the form data for submission
    const adminData = {
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      socialLinks: {
        website: formData.website,
        discord: formData.discord,
        youtube: formData.youtube,
        twitter: formData.twitter,
        instagram: formData.instagram,
      },
    };

    try {
      const response = await fetch("http://localhost:3000/api/create-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      });

      if (response.ok) {
        alert("Admin created successfully!");
      } else {
        alert("Failed to create admin");
      }
    } catch (error) {
      console.error("Error creating admin:", error);
      alert("An error occurred while creating the admin.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-sm text-gray-500 mb-4">
        Admin / Admin List / Add Admin
      </div>

      <h1 className="text-2xl font-semibold mb-6">Add Admin</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <label className="block">
            Member Image <span className="text-red-500">*</span>
          </label>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 w-64 text-center cursor-pointer bg-yellow-50"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-40 object-cover"
              />
            ) : (
              <>
                <button
                  type="button"
                  className="mb-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Browse
                </button>
                <p className="text-sm text-red-500">
                  Click to Upload or Drag & Drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  .jpeg .jpg .png .max 4mb
                </p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
            />
          </div>

          <div>
            <label className="block mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
            />
          </div>

          <div>
            <label className="block mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
          </div>

          <div>
            <label className="block mb-1">Phone Number</label>
            <div className="flex">
              <select
                className="p-2 border rounded-l-lg w-20"
                defaultValue="+62"
              >
                <option value="+62">+62</option>
              </select>
              <input
                type="tel"
                className="flex-1 p-2 border border-l-0 rounded-r-lg"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter Phone Number"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Bio</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Bio"
            />
          </div>

          <div>
            <label className="block mb-1">Website</label>
            <input
              type="url"
              className="w-full p-2 border rounded-lg"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="Website"
            />
          </div>

          <div>
            <label className="block mb-1">Discord</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              name="discord"
              value={formData.discord}
              onChange={handleInputChange}
              placeholder="Discord"
            />
          </div>

          <div>
            <label className="block mb-1">Youtube</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              name="youtube"
              value={formData.youtube}
              onChange={handleInputChange}
              placeholder="Youtube"
            />
          </div>

          <div>
            <label className="block mb-1">Twitter</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              name="twitter"
              value={formData.twitter}
              onChange={handleInputChange}
              placeholder="Twitter"
            />
          </div>

          <div>
            <label className="block mb-1">Instagram</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              name="instagram"
              value={formData.instagram}
              onChange={handleInputChange}
              placeholder="Instagram"
            />
          </div>

          <div>
            <label className="block mb-1">
              New Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="New Password"
            />
          </div>

          <div>
            <label className="block mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            onClick={() => setFormData(CancelClearFormData )}
            >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
