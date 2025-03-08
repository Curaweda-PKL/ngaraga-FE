import {BrowseCategories} from "./components/browse-categories";
import {DiscoverMoreCards} from "./components/discover-mores";
import {HowItWorks} from "./components/Find-Out";
import {HeroFrame} from "./components/hero-section";
import {CollectorCards} from "./components/top-collectors";
import {TrendingCards} from "./components/trending-cards";
import {WeeklyUpdateForm} from "./components/Weekly-Update";
import {Event} from "./components/event";

const Home = () => {
  return (
    <div className="text-[#262626]">
      <HeroFrame />
      <TrendingCards />
      <CollectorCards />
      <BrowseCategories />
      <DiscoverMoreCards />
      <Event />
      <HowItWorks />
      <WeeklyUpdateForm />
    </div>
  );
};

export default Home;
