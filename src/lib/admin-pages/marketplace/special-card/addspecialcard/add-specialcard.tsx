import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

import CardForm from "../../card/addcard/components/cardForm";
import CardSettings from "../../card/addcard/components/cardSetting";
import { SERVER_URL } from "@/middleware/utils";

export const AddSpecialCard = () => {
  const navigate = useNavigate();

  // States for API data
  const [apiCategories, setApiCategories] = useState<
    { id: number; name: string; image: string | null }[]
  >([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  const [apiCreators, setApiCreators] = useState<
    { id: number; name: string; image: string | null }[]
  >([]);
  const [creatorsLoading, setCreatorsLoading] = useState(true);
  const [creatorsError, setCreatorsError] = useState<string | null>(null);

  const [apiTags, setApiTags] = useState<{ id: number; name: string }[]>([]);
  const [tagsLoading, setTagsLoading] = useState(true);
  const [tagsError, setTagsError] = useState<string | null>(null);

  // Message state to display success or error messages
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  // Form data state (now including discountedPrice)
  const [formData, setFormData] = useState({
    cardImage: null as string | ArrayBuffer | null,
    cardName: "",
    sku: "",
    price: "",
    salePrice: false,
    discountedPrice: "", // NEW FIELD
    stock: "",
    cardDetails: "",
    categories: [] as string[],
    creator: false,
    selectedCreator: "",
    tag: false,
    tags: [] as string[],
    source: false,
    sourceImageWebsite: "",
    sourceImageAlt: "",
    cardType: "SPECIAL",
  });

  // Store file for upload
  const [cardFile, setCardFile] = useState<File | null>(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/categories/all`);
        const categoriesData = response.data.categories.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          image: cat.image
            ? `${SERVER_URL}/${cat.image.replace(/\\/g, "/")}`
            : null,
        }));
        setApiCategories(categoriesData);
        setCategoriesError(null);
      } catch (err) {
        setCategoriesError("Failed to load categories");
        setApiCategories([]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch creators
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/creator/all`);
        const creatorsData = response.data.creators.map((creator: any) => ({
          id: creator.id,
          name: creator.name,
          image: creator.image
            ? `${SERVER_URL}/uploads/creator/${encodeURIComponent(creator.image)}`
            : null,
        }));
        setApiCreators(creatorsData);
        setCreatorsError(null);
      } catch (error) {
        console.error("Error fetching creators:", error);
        setCreatorsError("Failed to load creators");
        setApiCreators([]);
      } finally {
        setCreatorsLoading(false);
      }
    };

    fetchCreators();
  }, []);

  // Preload creator images for smoother toggle experience.
  useEffect(() => {
    if (!creatorsLoading && !creatorsError) {
      apiCreators.forEach((creator) => {
        if (creator.image) {
          const img = new Image();
          img.src = creator.image;
        }
      });
    }
  }, [creatorsLoading, creatorsError, apiCreators]);

  // Fetch tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/tags/all`);
        setApiTags(response.data.tags);
        setTagsError(null);
      } catch (error) {
        console.error("Error fetching tags:", error);
        setTagsError("Failed to load tags");
        setApiTags([]);
      } finally {
        setTagsLoading(false);
      }
    };

    fetchTags();
  }, []);

  // Input change handler
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Image upload handler
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCardFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          cardImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag and drop handlers for image upload
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setCardFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          cardImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Cancel handler
  const handleCancel = () => {
    navigate("/admin/card");
  };

  // Save handler (create new card)
  const handleSave = async () => {
    try {
      // Basic validations
      if (formData.categories.length === 0) {
        throw new Error("Please select a category.");
      }
      if (!formData.cardName || !formData.sku || !formData.stock) {
        throw new Error("Card name, SKU, and stock are required.");
      }

      // Create FormData payload for multipart/form-data
      const payload = new FormData();
      payload.append("characterName", formData.cardName);
      payload.append("sku", formData.sku);
      payload.append("price", formData.price);
      payload.append("discountedPrice", formData.discountedPrice); // NEW FIELD
      payload.append("stock", formData.stock);
      payload.append("cardDetail", formData.cardDetails);
      payload.append("categoryId", formData.categories[0]);
      payload.append(
        "tagIds",
        JSON.stringify(formData.tags.map((tag) => Number(tag)))
      );
      payload.append(
        "creatorIds",
        JSON.stringify([Number(formData.selectedCreator)])
      );
      payload.append("ownerId", "");
      payload.append("cardType", "SPECIAL");

      if (formData.source) {
        payload.append(
          "sourceImage",
          JSON.stringify({
            website: formData.sourceImageWebsite,
            alt: formData.sourceImageAlt,
          })
        );
      }

      if (cardFile) {
        payload.append("image", cardFile);
      }

      // Post to the API endpoint
      const response = await axios.post(
        `${SERVER_URL}/api/cards/create`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Set a success message and navigate away
      setMessage({ type: "success", text: "Card created successfully!" });
      setTimeout(() => {
        navigate("/admin/card");
      }, 1500);
    } catch (error: any) {
      console.error(
        "Error creating card:",
        error.response?.data || error.message
      );
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to create card.",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Add Card</h1>

      {/* Message display */}
      {message && (
        <div
          className={`p-4 rounded-lg mb-4 ${
            message.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column - Form Fields */}
        <CardForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleImageUpload={handleImageUpload}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          setFormData={setFormData}
        />

        {/* Right Column - Categories and Settings */}
        <CardSettings
          formData={formData}
          handleInputChange={handleInputChange}
          setFormData={setFormData}
          apiCategories={apiCategories}
          categoriesLoading={categoriesLoading}
          categoriesError={categoriesError}
          apiCreators={apiCreators}
          creatorsLoading={creatorsLoading}
          creatorsError={creatorsError}
          apiTags={apiTags}
          tagsLoading={tagsLoading}
          tagsError={tagsError}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={handleCancel}
          className="px-6 py-2 border rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-call-to-actions-900 text-white rounded-lg hover:bg-call-to-actions-800"
        >
          Save
        </button>
      </div>
    </div>
  );
};
