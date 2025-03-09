import React, { useEffect, useState } from "react";
import { SERVER_URL } from "@/middleware/utils";
import { motion } from "framer-motion"; // Import motion untuk animasi fallback

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

// Fallback Data
const FALLBACK_PAGE_CONTENT: PageContent = {
  title: "How It Works",
  description: "Find Out How To Get Started",
  findCardTitle: "Find Your Card",
  findCardDescription:
    "Set up your wallet of choice. Connect it to the Animalket by clicking the wallet icon in the top right corner.",
  findCardImage: "https://via.placeholder.com/150",
  scanCardTitle: "Scan Your Card",
  scanCardDescription:
    "Upload your work and setup your collection. Add a description, social links and floor price.",
  scanCardImage: "https://via.placeholder.com/150",
  tradingTitle: "It's Work",
  tradingDescription:
    "Choose between auctions and fixed-price listings. Start earning by selling your NFTs or trading others.",
  tradingImage: "https://via.placeholder.com/150",
};

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
        setPageTitle(pageContent.title || FALLBACK_PAGE_CONTENT.title);
        setPageDescription(pageContent.description || FALLBACK_PAGE_CONTENT.description);

        // Format data untuk disesuaikan dengan struktur `steps`
        const formattedSteps: Step[] = [
          {
            title: pageContent.findCardTitle || FALLBACK_PAGE_CONTENT.findCardTitle,
            description:
              pageContent.findCardDescription || FALLBACK_PAGE_CONTENT.findCardDescription,
            image: pageContent.findCardImage
              ? `${SERVER_URL}/uploads/pageContent/${pageContent.findCardImage}`
              : FALLBACK_PAGE_CONTENT.findCardImage,
          },
          {
            title: pageContent.scanCardTitle || FALLBACK_PAGE_CONTENT.scanCardTitle,
            description:
              pageContent.scanCardDescription || FALLBACK_PAGE_CONTENT.scanCardDescription,
            image: pageContent.scanCardImage
              ? `${SERVER_URL}/uploads/pageContent/${pageContent.scanCardImage}`
              : FALLBACK_PAGE_CONTENT.scanCardImage,
          },
          {
            title: pageContent.tradingTitle || FALLBACK_PAGE_CONTENT.tradingTitle,
            description:
              pageContent.tradingDescription || FALLBACK_PAGE_CONTENT.tradingDescription,
            image: pageContent.tradingImage
              ? `${SERVER_URL}/uploads/pageContent/${pageContent.tradingImage}`
              : FALLBACK_PAGE_CONTENT.tradingImage,
          },
        ];

        setSteps(formattedSteps);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error instanceof Error ? error.message : "An unknown error occurred");
        setLoading(false);

        // Gunakan fallback data jika terjadi error
        setPageTitle(FALLBACK_PAGE_CONTENT.title);
        setPageDescription(FALLBACK_PAGE_CONTENT.description);
        setSteps([
          {
            title: FALLBACK_PAGE_CONTENT.findCardTitle,
            description: FALLBACK_PAGE_CONTENT.findCardDescription,
            image: FALLBACK_PAGE_CONTENT.findCardImage,
          },
          {
            title: FALLBACK_PAGE_CONTENT.scanCardTitle,
            description: FALLBACK_PAGE_CONTENT.scanCardDescription,
            image: FALLBACK_PAGE_CONTENT.scanCardImage,
          },
          {
            title: FALLBACK_PAGE_CONTENT.tradingTitle,
            description: FALLBACK_PAGE_CONTENT.tradingDescription,
            image: FALLBACK_PAGE_CONTENT.tradingImage,
          },
        ]);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <motion.svg
          className="w-20 h-20"
          viewBox="0 0 50 50"
          fill="none"
          stroke="#e53e3e"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <circle cx="25" cy="25" r="20" />
        </motion.svg>
        <p className="text-xl mt-4">Something went wrong. Using fallback data.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-primary mt-20 lg:mt-0">
      <div className="flex flex-col lg:flex-row items-center bg-transparent gap-8 max-w-6xl w-full rounded-2xl overflow-hidden">
        <div className="text-[#404040] w-full">
          <div className="mx-auto space-y-12 p-8 sm:p-12 lg:p-16">
            {/* Title Section */}
            <div className="relative">
              <h1 className="text-4xl font-bold text-[#171717] mb-4">
                {pageTitle}
              </h1>
              <p className="text-2xl text-[#404040]">
                {pageDescription}
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
                        className="w-16 h-16 object-contain rounded-full"
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