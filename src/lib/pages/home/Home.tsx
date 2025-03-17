import React, { memo } from "react";
import { useInView } from "react-intersection-observer";
import { BrowseCategories } from "./components/browse-categories";
import { DiscoverMoreCards } from "./components/discover-mores";
import { HowItWorks } from "./components/Find-Out";
import { HeroFrame } from "./components/hero-section";
import { CollectorCards } from "./components/top-collectors";
import { TrendingCards } from "./components/trending-cards";
import { WeeklyUpdateForm } from "./components/Weekly-Update";
import { Event } from "./components/event";

// Lazy-load component using the Intersection Observer API.
const LazyLoadComponent = ({
  children,
  placeholderHeight = "100vh",
}: {
  children: React.ReactNode;
  placeholderHeight?: string;
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      {inView ? children : <div style={{ minHeight: placeholderHeight }} />}
    </div>
  );
};

const Home = () => {
  return (
    <div className="text-[#262626]">
      <LazyLoadComponent placeholderHeight="100vh">
        <HeroFrame />
      </LazyLoadComponent>
      <LazyLoadComponent placeholderHeight="100vh">
        <TrendingCards />
      </LazyLoadComponent>
      <LazyLoadComponent placeholderHeight="100vh">
        <CollectorCards />
      </LazyLoadComponent>
      <LazyLoadComponent placeholderHeight="100vh">
        <BrowseCategories />
      </LazyLoadComponent>
      <LazyLoadComponent placeholderHeight="100vh">
        <DiscoverMoreCards />
      </LazyLoadComponent>
      <LazyLoadComponent placeholderHeight="100vh">
        <Event />
      </LazyLoadComponent>
      <LazyLoadComponent placeholderHeight="100vh">
        <HowItWorks />
      </LazyLoadComponent>
      <LazyLoadComponent placeholderHeight="100vh">
        <WeeklyUpdateForm />
      </LazyLoadComponent>
    </div>
  );
};

export default memo(Home);
