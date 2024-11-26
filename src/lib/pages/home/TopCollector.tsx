// import {Card} from "@/components/ui/card";

// const TopCollectors = () => {
//   const topCollectors = [
//     {
//       name: "Keepitreal",
//       card: "3409",
//       rank: 1,
//       avatar: "/images/avatars/avatar-1.jpg",
//       gradient: "from-purple-600 to-pink-600",
//     },
//     {
//       name: "DigiLab",
//       card: "2400",
//       rank: 2,
//       avatar: "/images/avatars/avatar-2.jpg",
//       gradient: "from-yellow-500 to-orange-500",
//     },
//     {
//       name: "GravityOne",
//       card: "2465",
//       rank: 3,
//       avatar: "/images/avatars/avatar-3.jpg",
//       gradient: "from-blue-500 to-teal-500",
//     },
//     {
//       name: "Juanie",
//       card: "2400",
//       rank: 4,
//       avatar: "/images/avatars/avatar-4.jpg",
//       gradient: "from-green-500 to-teal-500",
//     },
//     {
//       name: "BlueWhale",
//       card: "2400",
//       rank: 5,
//       avatar: "/images/avatars/avatar-5.jpg",
//       gradient: "from-blue-600 to-cyan-600",
//     },
//     {
//       name: "Mr Fox",
//       card: "2400",
//       rank: 6,
//       avatar: "/images/avatars/avatar-6.jpg",
//       gradient: "from-orange-500 to-red-500",
//     },
//     {
//       name: "Shroomie",
//       card: "2456",
//       rank: 7,
//       avatar: "/images/avatars/avatar-7.jpg",
//       gradient: "from-teal-500 to-cyan-500",
//     },
//     {
//       name: "Robotica",
//       card: "2400",
//       rank: 8,
//       avatar: "/images/avatars/avatar-8.jpg",
//       gradient: "from-gray-700 to-gray-900",
//     },
//     {
//       name: "RustyRobot",
//       card: "2400",
//       rank: 9,
//       avatar: "/images/avatars/avatar-9.jpg",
//       gradient: "from-blue-400 to-cyan-400",
//     },
//     {
//       name: "Animakid",
//       card: "2400",
//       rank: 10,
//       avatar: "/images/avatars/avatar-10.jpg",
//       gradient: "from-purple-500 to-pink-500",
//     },
//     {
//       name: "Dotgu",
//       card: "2400",
//       rank: 11,
//       avatar: "/images/avatars/avatar-11.jpg",
//       gradient: "from-yellow-400 to-orange-400",
//     },
//     {
//       name: "Ghiblier",
//       card: "2400",
//       rank: 12,
//       avatar: "/images/avatars/avatar-12.jpg",
//       gradient: "from-red-500 to-pink-500",
//     },
//   ];

//   return (
//     <section className="w-full max-w-7xl mx-auto px-4 py-16 bg-[#1F1F1F]">
//       <div className="flex justify-between items-center mb-10">
//         <div>
//           <h2 className="text-3xl font-bold text-white">Top Collectors</h2>
//           <p className="text-gray-400 mt-1">
//             Checkout Top Rated Collectors On The Ngaraga Marketplace
//           </p>
//         </div>
//         <button className="px-6 py-3 text-sm bg-transparent border-2 border-purple-600 text-purple-600 rounded-2xl hover:bg-purple-600 hover:text-white transition-colors font-semibold">
//           View Rankings
//         </button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {topCollectors.map((collector) => (
//           <Card
//             key={collector.name}
//             className="p-4 bg-[#2B2B2B] hover:bg-[#333333] transition-colors border-none cursor-pointer"
//           >
//             <div className="relative flex items-center space-x-4">
//               <div className="relative w-16 h-16">
//                 <div className="w-8 h-8 rounded-full bg-[#2B2B2B] border border-gray-600 absolute -top-2 -left-2 flex items-center justify-center text-sm font-medium">
//                   {collector.rank}
//                 </div>
//                 <div
//                   className={`w-16 h-16 rounded-full bg-gradient-to-r ${collector.gradient} flex items-center justify-center overflow-hidden`}
//                 >
//                   <img
//                     src="/api/placeholder/64/64"
//                     alt={collector.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-white text-lg">
//                   {collector.name}
//                 </h3>
//                 <p className="text-sm">
//                   <span className="text-gray-400">Total Card: </span>
//                   <span className="text-white font-medium">
//                     {collector.card}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default TopCollectors;
