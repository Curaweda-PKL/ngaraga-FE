import React, {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import {useNavigate} from "react-router-dom";

import CardForm from "./components/cardForm";
import CardSettings from "./components/cardSetting";
import { SERVER_URL } from "@/middleware/utils"; // Import centralized server URL

export const AddCard = () => {
  const navigate = useNavigate();

  // Categories state
  const [apiCategories, setApiCategories] = useState<
    Array<{id: number; name: string; image: string | null}>
  >([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  // Creators state
  const [apiCreators, setApiCreators] = useState<
    Array<{id: number; name: string; image: string | null}>
  >([]);
  const [creatorsLoading, setCreatorsLoading] = useState(true);
  const [creatorsError, setCreatorsError] = useState<string | null>(null);

  // Tags state
  const [apiTags, setApiTags] = useState<Array<{id: number; name: string}>>([]);
  const [tagsLoading, setTagsLoading] = useState(true);
  const [tagsError, setTagsError] = useState<string | null>(null);

  // Form data state
  const [formData, setFormData] = useState({
    cardImage: null as string | ArrayBuffer | null, // For preview
    cardName: "",
    sku: "",
    price: "",
    salePrice: "",
    isSaleActive: false,
    stock: "",
    cardDetails: "",
    categories: [] as string[], // stores selected category IDs as strings
    creator: false,
    selectedCreator: "", // stores selected creator ID as string
    tag: false,
    tags: [] as string[], // stores selected tag IDs as strings
    source: false,
  });

  // State to keep the actual file for upload
  const [cardFile, setCardFile] = useState<File | null>(null);

  // Fetch categories (include id)
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

  // Fetch creators (include id)
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

  // Preload creator images so they're cached on first toggle.
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
    const {name, value, type} = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({...prev, [name]: newValue}));
  };

  // Image upload handler
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCardFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({...prev, cardImage: reader.result}));
      };
      reader.readAsDataURL(file);
    }
  };

  // Cancel handler
  const handleCancel = () => navigate("/admin/card");

  // Drag over and drop handlers for image upload
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setCardFile(file); // Store file for upload
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

  // Save handler (create new card(s))
  const handleSave = async () => {
    try {
      const payload = new FormData();
      payload.append("characterName", formData.cardName);
      payload.append("sku", formData.sku);
      payload.append("price", formData.price);
      payload.append("stock", formData.stock);
      payload.append("cardDetail", formData.cardDetails);

      if (formData.categories.length > 0) {
        payload.append("categoryId", formData.categories[0]);
      } else {
        throw new Error("Please select a category.");
      }

      payload.append("tagIds", JSON.stringify(formData.tags.map(Number)));
      payload.append(
        "creatorIds",
        JSON.stringify([Number(formData.selectedCreator)])
      );
      payload.append("ownerId", "");

      if (cardFile) {
        payload.append("image", cardFile);
      }

<<<<<<< HEAD
      await axios.post("http://localhost:3000/api/cards/create", payload, {
        headers: {"Content-Type": "multipart/form-data"},
      });
=======
      // Send POST request to the API endpoint
      const response = await axios.post(
        `${SERVER_URL}/api/cards/create`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
>>>>>>> c91a9a81b14dd06e5413af88ea716cecb56287d7

      navigate("/admin/card");
    } catch (error: any) {
      alert(
        "Error creating card: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Add Card</h1>

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
