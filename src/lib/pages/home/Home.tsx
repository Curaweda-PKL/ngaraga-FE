import {BrowseCategories} from "./components/browse-categories";
import {HeroFrame} from "./components/hero-section";
import {CollectorCards} from "./components/top-collectors";
import {TrendingCards} from "./components/trending-cards";
import {DiscoverMoreCards} from "./components/Discover-More";
import {HowItWorks} from "./components/Find-Out";
import {WeeklyUpdateForm} from "./components/Weekly-Update";

const Home = () => {
  return (
    <div className="text-white">
      <HeroFrame />
      <TrendingCards />
      <CollectorCards />
      <BrowseCategories />
      <DiscoverMoreCards />
      <HowItWorks />
      <WeeklyUpdateForm />
    </div>
  );
};

export default Home;
