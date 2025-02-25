// Marketplace.tsx
import React, { useState, useCallback } from "react";
import { MarketHeader } from "./components/market-header";
import { MarketplaceCardSection, Card } from "./components/marketplace-card-section";

const Marketplace: React.FC = () => {
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);

  // Memoize the callback so its reference doesn't change on every render
  const handleFilteredCards = useCallback((cards: Card[]) => {
    setFilteredCards(cards);
  }, []);

  return (
    <div>
      <MarketHeader onFilteredCards={handleFilteredCards} />
      <MarketplaceCardSection filteredCards={filteredCards} />
    </div>
  );
};

export default Marketplace;
