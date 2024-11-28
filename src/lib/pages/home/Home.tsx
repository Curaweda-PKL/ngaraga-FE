import { BrowseCategories } from './components/browse-categories';
import { DiscoverMoreCards } from './components/discover-mores';
import { HowItWorks } from './components/find-out';
import { HeroFrame } from './components/hero-section';
import { CollectorCards } from './components/top-collectors';
import { TrendingCards } from './components/trending-cards';
import { WeeklyUpdateForm } from './components/weekly-update';

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
