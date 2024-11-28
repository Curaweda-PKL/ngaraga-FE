import {BrowseCategories} from "./components/browse-categories";
import {HeroFrame} from "./components/hero-section";
import {CollectorCards} from "./components/top-collectors";
import {TrendingCards} from "./components/trending-cards";
import {DiscoverMoreCards} from "./components/discover-mores";
import {OnboardingSteps} from "./components/find-out";
import {WeeklyUpdateForm} from "./components/weekly-update";

const Home = () => {
  return (
    <div className="text-white">
      <HeroFrame />
      <TrendingCards />
      <CollectorCards />
      <BrowseCategories />
      <DiscoverMoreCards />
      <OnboardingSteps />
      <WeeklyUpdateForm />
    </div>
  );
};

export default Home;
