
  export type Purchase = {
    orderId: string;
    productName: string;
    quantity: number;
    price: string;
    status: "Payment" | "Shipping" | "Packaging" | "Delivered";
    thumbnail?: string;
    creator?: string;
    otherProducts?: number;
    totalPrice?: string;
  };
  
 // types.ts
export type Card = {
  id: number;
  title?: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary" | "Special";
  image?: string;
  price?: string;
  index?: string;
  total?: string;
  achieved?: boolean;
  characterName: string;
};

export type Product = {
  id: number;
  sku: string;
  name: string;
  price: string; // adjust as needed (string or number)
  discountedPrice?: string;
  image?: string;
  cardDetail?: string;
  stock: number;
};

export type SpecialCard = Card & {
  claimStatus: "claimed" | "eligible" | "locked" | "unassigned";
  ownedNormalCount?: number;
  requiredNormalCount?: number;
  missingNormalCount?: number;
  product: Product;
  specialRequirement?: {
    requiredNormalCards: number[];
  };
  // Additional special card properties can be added here.
};
