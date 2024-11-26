// import {Card} from "@/components/ui/card";
// import {
//   Paintbrush,
//   Album,
//   Music,
//   Camera,
//   Video,
//   Wrench,
//   Basketball,
//   Planet,
// } from "lucide-react";

// const BrowseCategories = () => {
//   const categories = [
//     {
//       name: "Art",
//       icon: Paintbrush,
//       gradient: "from-purple-600 via-blue-500 to-purple-600",
//       bgImage: "linear-gradient(45deg, #4776E6 0%, #8E54E9 100%)",
//     },
//     {
//       name: "Collectibles",
//       icon: Album,
//       gradient: "from-yellow-400 via-orange-500 to-yellow-400",
//       bgImage: "linear-gradient(45deg, #FFD700 0%, #FFA500 100%)",
//     },
//     {
//       name: "Music",
//       icon: Music,
//       gradient: "from-pink-500 via-purple-500 to-pink-500",
//       bgImage: "linear-gradient(45deg, #E44D26 0%, #9B2C2C 100%)",
//     },
//     {
//       name: "Photography",
//       icon: Camera,
//       gradient: "from-gray-200 via-gray-400 to-gray-200",
//       bgImage: "linear-gradient(45deg, #757F9A 0%, #D7DDE8 100%)",
//     },
//     {
//       name: "Video",
//       icon: Video,
//       gradient: "from-cyan-500 via-blue-500 to-cyan-500",
//       bgImage: "linear-gradient(45deg, #1FA2FF 0%, #12D8FA 100%)",
//     },
//     {
//       name: "Utility",
//       icon: Wrench,
//       gradient: "from-red-500 via-pink-500 to-red-500",
//       bgImage: "linear-gradient(45deg, #FF512F 0%, #DD2476 100%)",
//     },
//     {
//       name: "Sport",
//       icon: Basketball,
//       gradient: "from-green-500 via-teal-500 to-green-500",
//       bgImage: "linear-gradient(45deg, #11998E 0%, #38EF7D 100%)",
//     },
//     {
//       name: "Virtual Worlds",
//       icon: Planet,
//       gradient: "from-purple-500 via-pink-500 to-purple-500",
//       bgImage: "linear-gradient(45deg, #654EA3 0%, #DA0C81 100%)",
//     },
//   ];

//   return (
//     <section className="w-full max-w-7xl mx-auto px-4 py-16 bg-[#1F1F1F]">
//       <h2 className="text-3xl font-bold text-white mb-10">Browse Categories</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {categories.map((category) => (
//           <Card
//             key={category.name}
//             className="group cursor-pointer border-none overflow-hidden"
//           >
//             <div
//               className="relative h-80 rounded-2xl overflow-hidden"
//               style={{
//                 background: category.bgImage,
//               }}
//             >
//               {/* Glass overlay */}
//               <div className="absolute inset-0 bg-black/30 backdrop-blur-sm group-hover:bg-black/40 transition-colors" />

//               {/* Icon and text container */}
//               <div className="relative h-full p-6 flex flex-col justify-between">
//                 <div className="w-12 h-12 rounded-2xl bg-[#2B2B2B] flex items-center justify-center">
//                   <category.icon className="w-6 h-6 text-white" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-white">
//                   {category.name}
//                 </h3>
//               </div>

//               {/* Gradient overlay */}
//               <div
//                 className={`absolute inset-0 opacity-20 bg-gradient-to-br ${category.gradient}`}
//               />
//             </div>
//           </Card>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default BrowseCategories;
