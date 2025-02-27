import { ChangeEvent, useEffect, useState, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "@/middleware/utils"; // Import centralized server URL

export const AddMember = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
    name: "",
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

  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("AddMemberForm");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("AddMemberForm", JSON.stringify(formData));
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
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  let newErrors = {
    name: formData.name ? "" : "Full Name is required",
    username: formData.username ? "" : "Username is required",
    email: formData.email ? "" : "Email is required",
    phoneNumber: formData.phoneNumber ? "" : "Phone Number is required",
    password: formData.password ? "" : "Password is required",
    confirmPassword: formData.confirmPassword
      ? formData.confirmPassword === formData.password
        ? ""
        : "Passwords do not match"
      : "Confirm Password is required",
  };

  setErrors(newErrors);

  if (Object.values(newErrors).some((error) => error !== "")) {
    return;
  }

  const MemberData = {
    name: formData.name,
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
    const response = await fetch(`${SERVER_URL}/api/register-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(MemberData),
    });
    if (response.ok) {
      alert("Member created successfully!");
      navigate("/admin/member");
    } else {
      const errorData = await response.json();
      alert(`Failed to create Member: ${errorData.message || JSON.stringify(errorData)}`);
    }
  } catch (error) {
    console.error("Error creating Member:", error);
    alert("An error occurred while creating the Member.");
  }
};

  return (
    <div className="p-6">
      <div className="text-sm text-gray-500 mb-4">
        Member / Member List / Add Member
      </div>

      <h1 className="text-2xl font-semibold mb-6">Add Member</h1>

      <form onSubmit={handleSubmit} className="space-y-6 border p-6 rounded-lg">
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
              className={`w-full p-2 border rounded-lg ${errors.name ? "border-red-500" : ""}`}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full p-2 border rounded-lg ${errors.username ? "border-red-500" : ""}`}
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className={`w-full p-2 border rounded-lg ${errors.email ? "border-red-500" : ""}`}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
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
                className={`w-full p-2 border rounded-lg ${errors.phoneNumber ? "border-red-500" : ""}`}
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter Phone Number"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber}
                </p>
              )}
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
              className={`w-full p-2 border rounded-lg ${errors.password ? "border-red-500" : ""}`}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="New Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className={`w-full p-2 border rounded-lg ${errors.confirmPassword ? "border-red-500" : ""}`}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            onClick={() => setFormData(CancelClearFormData)}
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
