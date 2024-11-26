import { HeroFrame } from "./components/hero-section";
import { TrendingCards } from "./components/trending-cards";

const Home = () => {
  return (
    <div className="text-white">
      <HeroFrame />
      <TrendingCards />

    </div>
  );
};

export default Home;
