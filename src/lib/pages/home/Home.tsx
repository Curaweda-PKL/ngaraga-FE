import { BrowseCategories } from "./components/browse-categories";
import { HeroFrame } from "./components/hero-section";
import { CollectorCards } from "./components/top-collectors";
import { TrendingCards } from "./components/trending-cards";
import { WeeklyUpdateForm} from "./components/weekly-update";

const Home = () => {
  return (
    <div className="text-white">
      <HeroFrame />
      <TrendingCards />
      <CollectorCards/>
      <BrowseCategories />
      <WeeklyUpdateForm />
    </div>
  );
};

export default Home;
