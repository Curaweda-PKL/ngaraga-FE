import React, { useEffect, useState } from "react";
import { SERVER_URL } from "@/middleware/utils";

// Interface untuk data dari backend
interface PageContent {
  title: string;
  description: string;
  findCardTitle: string;
  findCardDescription: string;
  findCardImage: string;
  scanCardTitle: string;
  scanCardDescription: string;
  scanCardImage: string;
  tradingTitle: string;
  tradingDescription: string;
  tradingImage: string;
}

interface ApiResponse {
  pageContent: PageContent;
}

// Interface untuk data yang diformat
interface Step {
  title: string;
  description: string;
  image: string;
}

export const HowItWorks = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageTitle, setPageTitle] = useState("How It Works"); // Default title
  const [pageDescription, setPageDescription] = useState("Find Out How To Get Started"); // Default description

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Sesuaikan endpoint dengan slug yang benar
        const slug = "findscan-trading"; // Ganti dengan slug yang sesuai
        const response = await fetch(`${SERVER_URL}/api/findscan-trading/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: ApiResponse = await response.json();
        const { pageContent } = data;

        // Set title dan description dari backend
        setPageTitle(pageContent.title || "How It Works"); // Fallback title
        setPageDescription(pageContent.description || "Find Out How To Get Started"); // Fallback description

        // Format data untuk disesuaikan dengan struktur `steps`
        const formattedSteps: Step[] = [
          {
            title: pageContent.findCardTitle || "Find Your Card", // Fallback title
            description:
              pageContent.findCardDescription ||
              "Set up your wallet of choice. Connect it to the Animalket by clicking the wallet icon in the top right corner.", // Fallback description
            image: `${SERVER_URL}/uploads/pageContent/${pageContent.findCardImage}`, // Sesuaikan path gambar
          },
          {
            title: pageContent.scanCardTitle || "Scan Your Card", // Fallback title
            description:
              pageContent.scanCardDescription ||
              "Upload your work and setup your collection. Add a description, social links and floor price.", // Fallback description
            image: `${SERVER_URL}/uploads/pageContent/${pageContent.scanCardImage}`, // Sesuaikan path gambar
          },
          {
            title: pageContent.tradingTitle || "It's Work", // Fallback title
            description:
              pageContent.tradingDescription ||
              "Choose between auctions and fixed-price listings. Start earning by selling your NFTs or trading others.", // Fallback description
            image: `${SERVER_URL}/uploads/pageContent/${pageContent.tradingImage}`, // Sesuaikan path gambar
          },
        ];

        setSteps(formattedSteps);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error instanceof Error ? error.message : "An unknown error occurred");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-primary mt-20 lg:mt-0">
      <div className="flex flex-col lg:flex-row items-center bg-transparent gap-8 max-w-6xl w-full rounded-2xl overflow-hidden">
        <div className="text-[#404040] w-full">
          <div className="mx-auto space-y-12 p-8 sm:p-12 lg:p-16"> {/* Sesuaikan padding dengan WeeklyUpdateForm */}
            {/* Title Section */}
            <div className="relative">
              <h1 className="text-4xl font-bold text-[#171717] mb-4">
                {pageTitle} {/* Judul dari backend */}
              </h1>
              <p className="text-2xl text-[#404040]">
                {pageDescription} {/* Deskripsi dari backend */}
              </p>
            </div>

            {/* Cards Grid */}
            <div className="flex justify-center">
              <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-16 w-full">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="bg-[#F2F2F2] rounded-2xl p-10 flex flex-col items-center text-center"
                  >
                    {/* Gradient Circle with Image */}
                    <div className="w-24 h-24 bg-gradient-to-br from-[#FED700] to-[#8C4D00] rounded-full flex items-center justify-center mb-8 relative overflow-hidden">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-16 h-16 object-contain rounded-full" // Menggunakan object-contain agar gambar tidak di-crop
                        onError={(e) => {
                          console.error("Error loading image:", e);
                          e.currentTarget.src = "https://via.placeholder.com/150"; // Fallback image
                        }}
                      />
                      {/* Enhanced Decorative Elements */}
                      <div className="absolute w-full h-full flex flex-wrap justify-center items-center -z-10">
                        <span className="w-3 h-3 bg-white rounded-full opacity-30 m-1 transition-all duration-500 group-hover:scale-150" />
                        <span className="w-4 h-4 bg-white rounded-full opacity-20 m-1 transition-all duration-500 group-hover:scale-125" />
                      </div>
                    </div>

                    {/* Card Content */}
                    <h3 className="text-2xl font-semibold mb-4 text-[#404040]">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};