import {  Purchase } from "./types";

// export const cardData: Card[] = [
//   {
//     id: 1,
//     title: "Distant Galaxy",
//     rarity: "Rare",
//     image: "/src/assets/img/Distant-Galaxy.png",
//     price: "Rp. 200.000",
//   },
//   {
//     id: 2,
//     title: "Solar Symphony",
//     rarity: "Epic",
//     image: "/src/assets/img/Solar-Symphony.png",
//     price: "Rp. 250.000",
//   },
// ];

// export const specialCardData: Card[] = [
//   {
//     id: 1,
//     title: "Distant Galaxy",
//     rarity: "Legendary",
//     image: "/src/assets/img/Distant-Galaxy.png",
//     index: "04",
//     total: "04",
//     achieved: true,
//   },
//   {
//     id: 2,
//     title: "AstroFiction",
//     rarity: "Epic",
//     image: "/src/assets/img/AstroFiction.png",
//     index: "06",
//     total: "05",
//   },
//   {
//     id: 3,
//     title: "Distant Galaxy",
//     rarity: "Special",
//     image: "/src/assets/img/Distant-Galaxy.png",
//     index: "00",
//     total: "03",
//   },
// ];

export const purchaseData: Purchase[] = [
  {
    orderId: "ORD123456789",
    productName: "Dancing Robot 0512",
    creator: "Orbitian",
    quantity: 1,
    price: "Rp 200.000",
    status: "Payment",
    thumbnail: "https://via.placeholder.com/150",
    otherProducts: 4,
    totalPrice: "Rp 460.650",
  },
  {
    orderId: "ORD987654321",
    productName: "Dancing Robot 0512",
    creator: "Orbitian",
    quantity: 1,
    price: "Rp 200.000",
    status: "Shipping",
    thumbnail: "https://via.placeholder.com/150",
    otherProducts: 4,
    totalPrice: "Rp 460.650",
  },
  {
    orderId: "ORD112233445",
    productName: "Space Explorer",
    creator: "StarMaker",
    quantity: 2,
    price: "Rp 400.000",
    status: "Packaging",
    thumbnail: "https://via.placeholder.com/150",
    otherProducts: 2,
    totalPrice: "Rp 500.000",
  },
  {
    orderId: "ORD998877665",
    productName: "Astro Helmet",
    creator: "GalaxyDesigns",
    quantity: 1,
    price: "Rp 150.000",
    status: "Delivered",
    thumbnail: "https://via.placeholder.com/150",
    otherProducts: 1,
    totalPrice: "Rp 200.000",
  },
];
