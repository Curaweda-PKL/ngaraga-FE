export type Card = {
    id: number;
    title: string;
    rarity: "Common" | "Rare" | "Epic" | "Legendary" | "Special";
    image: string;
    price?: string;
    index?: string;
    total?: string;
    achieved?: boolean;
  };
  
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
  