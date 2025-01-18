import {useState, useRef} from "react";

interface FormDataType {
  memberImage: File | null; // Explicitly define type
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  bio: string;
  website: string;
  discord: string;
  youtube: string;
  twitter: string;
  instagram: string;
  newPassword: string;
  confirmPassword: string;
}

export const AddMember = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<FormDataType>({
    memberImage: null,
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    countryCode: "+62",
    bio: "",
    website: "",
    discord: "",
    youtube: "",
    twitter: "",
    instagram: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({...formData, memberImage: file});
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
      setFormData({...formData, memberImage: file});
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-sm text-gray-500 mb-4">
        Member / Member List / Add Member
      </div>

      <h1 className="text-2xl font-semibold mb-6">Add Member</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
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
              value={formData.fullName}
              onChange={(e) =>
                setFormData({...formData, fullName: e.target.value})
              }
            />
          </div>

          <div>
            <label className="block mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={formData.username}
              onChange={(e) =>
                setFormData({...formData, username: e.target.value})
              }
            />
          </div>

          <div>
            <label className="block mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg"
              value={formData.email}
              onChange={(e) =>
                setFormData({...formData, email: e.target.value})
              }
            />
          </div>

          <div>
            <label className="block mb-1">Phone Number</label>
            <div className="flex">
              <select
                className="p-2 border rounded-l-lg w-20"
                value={formData.countryCode}
                onChange={(e) =>
                  setFormData({...formData, countryCode: e.target.value})
                }
              >
                <option value="+62">+62</option>
              </select>
              <input
                type="tel"
                className="flex-1 p-2 border border-l-0 rounded-r-lg"
                placeholder="Enter Phone Number"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({...formData, phoneNumber: e.target.value})
                }
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Bio</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
            />
          </div>

          <div>
            <label className="block mb-1">Website</label>
            <input
              type="url"
              className="w-full p-2 border rounded-lg"
              value={formData.website}
              onChange={(e) =>
                setFormData({...formData, website: e.target.value})
              }
            />
          </div>

          <div>
            <label className="block mb-1">Discord</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={formData.discord}
              onChange={(e) =>
                setFormData({...formData, discord: e.target.value})
              }
            />
          </div>

          <div>
            <label className="block mb-1">Youtube</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={formData.youtube}
              onChange={(e) =>
                setFormData({...formData, youtube: e.target.value})
              }
            />
          </div>

          <div>
            <label className="block mb-1">Twitter</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={formData.twitter}
              onChange={(e) =>
                setFormData({...formData, twitter: e.target.value})
              }
            />
          </div>

          <div>
            <label className="block mb-1">Instagram</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={formData.instagram}
              onChange={(e) =>
                setFormData({...formData, instagram: e.target.value})
              }
            />
          </div>

          <div>
            <label className="block mb-1">
              New Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({...formData, newPassword: e.target.value})
              }
            />
          </div>

          <div>
            <label className="block mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({...formData, confirmPassword: e.target.value})
              }
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="button"
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 w-full md:w-auto"
          >
            + Add New Address
          </button>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
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
