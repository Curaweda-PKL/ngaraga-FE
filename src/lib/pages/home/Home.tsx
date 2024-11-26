import {HeroFrame} from "./components/hero-section";
import {TrendingCards} from "./components/trending-cards";
import {WeeklyUpdateForm} from "./components/Weekly-Update";

const Home = () => {
  return (
    <div className="text-white bg-[#2B2B2B]">
      <HeroFrame />
      <TrendingCards />
      <WeeklyUpdateForm />
    </div>
  );
};

export default Home;
