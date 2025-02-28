import React, { useState, useCallback } from "react";
import { MarketHeader } from "./components/market-header";
import { MarketplaceCardSection, Card } from "./components/marketplace-card-section";

const Marketplace: React.FC = () => {
  // Initialize filteredCards as null (no filtering by default)
  const [filteredCards, setFilteredCards] = useState<Card[] | null>(null);

  // Memoize the callback and handle the case when cards is null
  const handleFilteredCards = useCallback((cards: Card[] | null) => {
    // Set filteredCards to an array if a filter is applied,
    // otherwise, pass null so that the default auto-fetch occurs.
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
