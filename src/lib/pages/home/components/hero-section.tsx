import { useEffect, useRef, useState } from "react";
import { RiRocketFill } from "react-icons/ri";
import "./style.css";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Helper component for animated count-up using Framer Motion
const AnimatedNumber = ({ value }: { value: number }) => {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 100, damping: 20 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return () => unsubscribe();
  }, [springValue]);

  return <motion.span>{displayValue}</motion.span>;
};

// Type definitions for API response
interface Creator {
  name: string;
  image: string;
}

interface HeroCard {
  id: number;
  characterName: string;
  product: {
    image: string;
  };
  creators: Creator[];
}

interface HeroBanner {
  id: number;
  slug: string;
  title: string;
  description: string;
  image?: string | null;
  heroBannerTitle?: string;
  heroBannerDescription?: string;
  heroCardId?: number | null;
  heroCard?: HeroCard | null;
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  totalCards: number;
  totalUsers: number;
  totalCategories: number;
}

interface ApiResponse {
  heroBanner: HeroBanner;
  stats: Stats;
}

// Fallback component for network errors with animated SVG
const ErrorFallback = () => {
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
      <p className="text-xl mt-4">Something went wrong with</p>
    </div>
  );
};

export const HeroFrame = () => {
  const navigate = useNavigate();
  const xRef = useRef<NodeJS.Timeout | null>(null);
  const [heroBanner, setHeroBanner] = useState<HeroBanner | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch hero banner data and stats using axios and SERVER_URL
  useEffect(() => {
    axios
      .get<ApiResponse>(`${SERVER_URL}/api/hero-banner/hero-banner`)
      .then((response) => {
        const data = response.data;
        setHeroBanner(data.heroBanner);
        setStats(data.stats);
        setLoading(false);
      })
      .catch((err: Error) => {
        console.error("Error fetching hero banner:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // --- Card Image Setup ---
  const rawCardImage =
    heroBanner?.heroCard?.product?.image ||
    "https://i.ibb.co/com/f8ZDQzh/DAENDELS-LEGEND.jpg";
  const normalizedCardImage = rawCardImage.replace(/\\/g, "/");
  const cardImage = normalizedCardImage.startsWith("http")
    ? normalizedCardImage
    : `${SERVER_URL}/${normalizedCardImage}`;

  useEffect(() => {
    console.log("Pikafront image URL:", cardImage);
    document.documentElement.style.setProperty("--pikafront", `url(${cardImage})`);
  }, [cardImage]);

  // --- Creator Image Setup ---
  const rawCreatorImage =
    heroBanner?.heroCard?.creators && heroBanner.heroCard.creators[0]?.image
      ? heroBanner.heroCard.creators[0].image
      : "https://placeimg.com/64/64/people";
  const normalizedCreatorImage = rawCreatorImage.replace(/\\/g, "/");
  const creatorImage = normalizedCreatorImage.startsWith("http")
    ? normalizedCreatorImage
    : normalizedCreatorImage.startsWith("src/uploads")
    ? `${SERVER_URL}/api/${normalizedCreatorImage}`
    : `${SERVER_URL}/src/uploads/creator/${normalizedCreatorImage}`;

  // jQuery animation effects (unchanged)
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "/src/lib/pages/home/components/style.js";
    script.async = true;
    document.body.appendChild(script);

    const $cards = $(".card-container");
    const $style = $(".hover");

    $cards
      .on("mousemove touchmove", function (e) {
        let pos: [number, number] = [0, 0];
        if (e.type === "touchmove" && e.touches) {
          pos = [e.touches[0].clientX, e.touches[0].clientY];
        } else if (e.type === "mousemove") {
          pos = [e.offsetX ?? 0, e.offsetY ?? 0];
        }
        e.preventDefault();
        const $card = $(this);
        const l = pos[0];
        const t = pos[1];
        const h = $card.height();
        const w = $card.width();
        if (typeof l === "number" && typeof t === "number" && h && w) {
          const px = Math.abs(Math.floor((100 / w) * l) - 100);
          const py = Math.abs(Math.floor((100 / h) * t) - 100);
          const pa = (50 - px) + (50 - py);
          const lp = (50 + (px - 50) / 1.5);
          const tp = (50 + (py - 50) / 1.5);
          const px_spark = (50 + (px - 50) / 7);
          const py_spark = (50 + (py - 50) / 7);
          const p_opc = 20 + (Math.abs(pa) * 1.5);
          const ty = ((tp - 50) / 2) * -1;
          const tx = ((lp - 50) / 1.5) * 0.5;
          const grad_pos = `background-position: ${lp}% ${tp}%;`;
          const sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`;
          const opc = `opacity: ${p_opc / 100};`;
          const tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`;
          const style = `
            .card-container:hover:before { ${grad_pos} }
            .card-container:hover:after { ${sprk_pos} ${opc} }
          `;
          $cards.removeClass("active");
          $card.removeClass("animated");
          $card.attr("style", tf);
          $style.html(style);
        }
        if (e.type === "touchmove") {
          return false;
        }
        if (xRef.current) {
          clearTimeout(xRef.current);
        }
      })
      .on("mouseout touchend touchcancel", function () {
        const $card = $(this);
        $style.html("");
        $card.removeAttr("style");
        xRef.current = setTimeout(function () {
          $card.addClass("animated");
        }, 2500);
      });

    return () => {
      document.body.removeChild(script);
      $cards.off("mousemove touchmove mouseout touchend touchcancel");
      if (xRef.current) {
        clearTimeout(xRef.current);
      }
    };
  }, []);

  // Fallback values if heroBanner data is missing
  const cardName = heroBanner?.heroCard?.characterName || "Space Walking";
  const creator =
    (heroBanner?.heroCard?.creators && heroBanner.heroCard.creators[0]) || {
      name: "Animakid",
      image: "https://placeimg.com/64/64/people",
    };

  // Navigate to detail page using the hero card's id if available.
  const handleCardClick = () => {
    if (heroBanner?.heroCard?.id) {
      navigate(`/detail-cards/${heroBanner.heroCard.id}`);
    } else {
      navigate("/detail-cards");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <ErrorFallback />;

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <div className="flex flex-col lg:flex-row font-[Nunito Sans] items-center bg-transparent border border-transparent gap-6 sm:gap-8 max-w-6xl w-full rounded-2xl overflow-hidden">
        {/* Left Section */}
        <div className="flex flex-col items-center lg:items-start gap-6 sm:gap-8 w-full lg:w-1/2 p-4 sm:p-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#171717] text-center lg:text-left break-words">
            {heroBanner?.heroBannerTitle || "Discover Dolanan Yuk Cards!"}
          </h1>
          <p className="text-xl sm:text-2xl text-[#404040] leading-relaxed text-center lg:text-left font-mono">
            {heroBanner?.heroBannerDescription ||
              "A new way to collect and gift cards with other collectors."}
          </p>
          <button
            onClick={handleCardClick}
            className="bg-call-to-action text-white py-3 px-8 sm:px-10 rounded-2xl text-lg font-medium flex items-center gap-3 sm:gap-4 hover:opacity-90"
          >
            <RiRocketFill className="text-3xl sm:text-4xl" />
            Get Started
          </button>
          {stats && (
            <div className="flex gap-6 sm:gap-8 justify-center font-[Nunito Sans] lg:justify-start">
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl font-bold">
                  <span className="text-[#404040]">
                    <AnimatedNumber value={stats.totalCards} />
                  </span>
                </h3>
                <p className="text-[#404040]">Cards</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl font-bold">
                  <span className="text-[#404040]">
                    <AnimatedNumber value={stats.totalUsers} />
                  </span>
                </h3>
                <p className="text-[#404040]">Collectors</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl font-bold">
                  <span className="text-[#404040]">
                    <AnimatedNumber value={stats.totalCategories} />
                  </span>
                </h3>
                <p className="text-[#404040]">Categories</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center lg:items-start gap-6 sm:gap-8 w-full lg:w-1/2 p-4 sm:p-6">
          <div
            className="card-container pika animated p-0"
            onClick={handleCardClick}
          ></div>
          {/* Content Below the Card */}
          <div className="flex flex-col items-start gap-4 p-4 sm:p-6">
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#171717] font-mono ml-[-10px] lg:text-2xl lg:ml-0">
              {cardName}
            </h2>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-8 h-8 rounded-full">
                  <img src={creatorImage} alt="Creator Avatar" />
                </div>
              </div>
              <span className="text-[#171717] font-mono">{creator.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
