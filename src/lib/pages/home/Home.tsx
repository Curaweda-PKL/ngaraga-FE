import { HeroFrame } from "./components/hero-section";
import { CollectorCards } from "./components/top-collectors";
import { TrendingCards } from "./components/trending-cards";

const Home = () => {
  return (
    <div className="text-white">
      <HeroFrame />
      <TrendingCards />
      <CollectorCards/>

    </div>
  );
};

export default Home;
