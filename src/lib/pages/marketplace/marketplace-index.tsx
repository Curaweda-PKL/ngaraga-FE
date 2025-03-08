import React, { useState, useCallback } from "react";
import { MarketHeader } from "./components/market-header";
import { MarketplaceCardSection, Card } from "./components/marketplace-card-section";

const Marketplace: React.FC = () => {
  const [filteredCards, setFilteredCards] = useState<Card[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleFilteredCards = useCallback((cards: Card[] | null) => {
    setFilteredCards(cards);
  }, []);

  return (
    <div>
      <MarketHeader 
        onFilteredCards={handleFilteredCards} 
        onSearchQueryChange={(query) => setSearchQuery(query)}
      />
      <MarketplaceCardSection 
        filteredCards={filteredCards} 
        searchQuery={searchQuery} 
      />
    </div>
  );
};

export default Marketplace;
