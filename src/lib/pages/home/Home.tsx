import { BrowseCategories } from './components/browse-categories';
import { DiscoverMoreCards } from './components/discover-mores';
import { HowItWorks } from './components/find-out';
import { HeroFrame } from './components/hero-section';
import { CollectorCards } from './components/top-collectors';
import { TrendingCards } from './components/trending-cards';
import { WeeklyUpdateForm } from './components/weekly-update';
import { Event } from './components/event';

const Home = () => {
  return (
    <div className="text-white">
      <HeroFrame />
      <TrendingCards />
      <CollectorCards />
      <BrowseCategories />
      <DiscoverMoreCards />
      <Event/>
      <HowItWorks />
      <WeeklyUpdateForm />
    </div>
  );
};

export default Home;
