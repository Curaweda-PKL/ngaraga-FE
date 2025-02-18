// import React, { useState } from "react";
// import { AiOutlineUser } from "react-icons/ai";
// import { MdOutlineMail } from "react-icons/md";
// import { CiGlobe, CiTwitter } from "react-icons/ci";
// import { AiOutlineDiscord, AiOutlineYoutube } from "react-icons/ai";
// import { IoLogoInstagram } from "react-icons/io";
// import { IoRadioButtonOn } from "react-icons/io5";

// interface FormData {
//   userName: string;
//   fullName: string;
//   email: string;
//   phoneCode: string;
//   phoneNumber: string;
// }

// const EditProfilePage: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     userName: "",
//     fullName: "",
//     email: "",
//     phoneCode: "+62",
//     phoneNumber: "",
//   });
//   const [activeTab, setActiveTab] = useState<string>("address");
//   const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

//   const PhoneInput: React.FC = () => (
//     <div className="flex">
//       <select
//         name="phoneCode"
//         value={formData.phoneCode}
//         onChange={handleFormChange}
//         className="border border-neutral-colors-500 rounded-l-lg p-3 pr-5"
//       >
//         <option value="+62">+62</option>
//         <option value="+1">+1</option>
//         <option value="+44">+44</option>
//       </select>
//       <input
//         type="text"
//         name="phoneNumber"
//         value={formData.phoneNumber}
//         onChange={handleFormChange}
//         placeholder="Phone Number"
//         className="w-full border border-neutral-colors-500 rounded-r-lg p-3"
//       />
//     </div>
//   );

//   const [columns, setColumns] = useState(
//     [...Array(5)].map(() => ({
//       enabled: true,
//       value: "https://www.example.com/",
//     }))
//   );

//   const handleAddressClick = (index: number) => {
//     setSelectedAddress(index); // Perbarui state dengan indeks kartu yang dipilih
//   };

//   const handleFormChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleInputChange = (index: number, value: string) => {
//     setColumns((prev) =>
//       prev.map((col, idx) => (idx === index ? { ...col, value } : col))
//     );
//   };

//   const toggleColumn = (index: number) => {
//     setColumns((prev) =>
//       prev.map((col, idx) =>
//         idx === index ? { ...col, enabled: !col.enabled } : col
//       )
//     );
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Submitted Form Data:", formData);
//     console.log("Website Links:", columns);
//   };

//   return (
//     <div className="flex flex-col">
//       {/* Background Section (Banner) */}
//       <section className="relative h-64">
//         <div
//           className="absolute top-0 w-full h-full bg-center bg-cover"
//           style={{
//             background:
//               "linear-gradient(180deg, rgba(221, 177, 31, 0) 0%, rgba(221, 177, 31, 0.5) 100%), url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-4">
//             {/* Button 1 */}
//             <button className="bg-call-to-actions-900 text-white py-2 px-6 rounded-lg hover:bg-opacity-80">
//               Replace
//             </button>

//             {/* Button 2 */}
//             <button className="bg-neutral-colors-100 text-call-to-actions-900 py-2 px-6 rounded-lg hover:bg-opacity-80">
//               Remove
//             </button>
//           </div>
//         </div>
//       </section>

//       <div className="container mx-auto px-6 py-10">
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white rounded-xl p-10 flex flex-col sm:flex-row sm:space-x-10"
//         >
//           {/* Left Section: Tabs and Profile Picture */}
//           <div className="flex flex-col sm:flex-row sm:w-1/3">
//             {/* Tabs Section */}
//             <div className="flex flex-col items-center sm:items-start sm:pr-6 sm:border-r sm:border-gray-300 mt-4">
//               <button
//                 onClick={() => setActiveTab("basic")}
//                 className={`${
//                   activeTab === "basic"
//                     ? "bg-call-to-actions-100 border border-call-to-actions-900 text-call-to-actions-900"
//                     : "bg-neutral-colors-100 border border-neutral-colors-400"
//                 } px-6 py-2 mb-4 rounded-lg text-lg font-medium w-full text-center`}
//               >
//                 Basic Information
//               </button>
//               <button
//                 onClick={() => setActiveTab("address")}
//                 className={`${
//                   activeTab === "address"
//                     ? "bg-call-to-actions-100 border border-call-to-actions-900 text-call-to-actions-900"
//                     : "bg-neutral-colors-100 border border-neutral-colors-400"
//                 } px-6 py-2 rounded-lg text-lg font-medium w-full text-center`}
//               >
//                 Address
//               </button>
//             </div>

//             {/* Profile Picture */}
//             <div className="flex flex-col items-center ml-14 mt-6 sm:mt-0 sm:pl-6">
//               <div className="relative w-32 h-32 mt-4 mb-6">
//                 <img
//                   src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
//                   alt="Profile"
//                   className="w-full h-full rounded-lg object-cover shadow-lg"
//                 />
//               </div>
//               <button className="bg-call-to-actions-900 text-white px-8 py-2 rounded-lg flex items-center space-x-3 text-lg font-medium hover:bg-yellow-600">
//                 Replace
//               </button>
//             </div>
//           </div>

//           {/* Right Section: Form */}
//           <div className="flex-grow">
//             {/* Render content based on the active tab */}
//             {activeTab === "basic" ? (
//               <>
//                 {/* user Name Field */}
//                 <div className="relative w-full mt-4 mb-4">
//                   <AiOutlineUser
//                     className="absolute text-neutral-colors-500 left-3 top-1/2 transform -translate-y-1/2"
//                     size={23}
//                   />
//                   <input
//                     type="text"
//                     name="userName"
//                     value={formData.userName}
//                     onChange={handleFormChange}
//                     placeholder="Username"
//                     className="w-full border border-neutral-colors-500 rounded-lg p-3 pl-11"
//                   />
//                 </div>

//                 {/* Full Name Field */}
//                 <div className="relative w-full mt-4 mb-4">
//                   <AiOutlineUser
//                     className="absolute text-neutral-colors-500 left-3 top-1/2 transform -translate-y-1/2"
//                     size={23}
//                   />
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleFormChange}
//                     placeholder="Full Name"
//                     className="w-full border border-neutral-colors-500 rounded-lg p-3 pl-11"
//                   />
//                 </div>

//                 {/* Email Field */}
//                 <div className="relative w-full mb-4">
//                   <MdOutlineMail
//                     className="absolute text-neutral-colors-500 left-3 top-1/2 transform -translate-y-1/2"
//                     size={23}
//                   />
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleFormChange}
//                     placeholder="Email"
//                     className="w-full border border-neutral-colors-500 rounded-lg p-3 pl-11"
//                   />
//                 </div>

//                 {/* Phone Field */}
//                 <PhoneInput />

//                 {/* Bio */}
//                 <textarea
//                   className="mt-4 w-full border border-gray-300 rounded-lg p-4 shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
//                   placeholder="The internet's friendliest designer kid."
//                 ></textarea>
//               </>
//             ) : (
//               <></>
//             )}
//             {activeTab === "address" && (
//               <>
//                 {/* Address Cards */}
//                 {[...Array(3)].map((_, index) => (
//                   <div key={index} className="grid grid-cols-1 gap-4">
//                     <div
//                       className={`p-4 border rounded-lg shadow-md mt-4 ${
//                         selectedAddress === index
//                           ? "bg-white-100 border-call-to-actions-900"
//                           : "bg-white border-gray-300"
//                       }`}
//                       onClick={() => handleAddressClick(index)}
//                     >
//                       <div className="flex items-center mb-3">
//                         {selectedAddress === index && (
//                           <IoRadioButtonOn className="text-call-to-actions-900 mr-3" />
//                         )}
//                         <span className="material-icons text-gray-500 mr-3">
//                           home
//                         </span>
//                         <h3 className="text-lg font-semibold text-gray-800">
//                           Address {index + 1}
//                         </h3>
//                       </div>
//                       <p className="text-gray-700 text-sm mb-2">
//                         +62 854 5565 6745
//                       </p>
//                       <p className="text-gray-600 text-sm leading-relaxed">
//                         Jl. Medan Merdeka Barat No.12, Gambir, Kecamatan Gambir,
//                         Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110
//                       </p>
//                       <div className="flex mt-4 space-x-4">
//                         <button className="text-call-to-actions-900 text-sm font-medium hover:underline">
//                           Edit
//                         </button>
//                         <button className="text-call-to-actions-900 text-sm font-medium hover:underline">
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 {/* Button "Add New Address" */}
//                 <div className="flex justify-end mt-4">
//                   <button className="bg-call-to-actions-100 border border-call-to-actions-900 text-call-to-actions-900 py-2 px-4 rounded-lg hover:bg-opacity-80">
//                     + Add New Address
//                   </button>
//                 </div>
//               </>
//             )}

//             {/* Website Links - Hanya ditampilkan pada tab "basic" */}
//             {activeTab === "basic" &&
//               columns.map((column, index) => (
//                 <div key={index} className="flex flex-col mt-4 space-y-2">
//                   {/* Toggle Button */}
//                   <button
//                     type="button"
//                     onClick={() => toggleColumn(index)}
//                     className={`flex items-center justify-center w-10 h-6 rounded-full ${
//                       column.enabled ? "bg-call-to-actions-900" : "bg-gray-300"
//                     }`}
//                   >
//                     <div
//                       className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
//                         column.enabled ? "translate-x-4" : "translate-x-0"
//                       }`}
//                     ></div>
//                   </button>

//                   {/* Input Field with Icon inside the column */}
//                   <div className="relative flex items-center w-full mt-2">
//                     {index === 0 && (
//                       <CiGlobe
//                         size={24}
//                         className={`absolute left-3 ${
//                           !column.enabled ? "text-gray-400" : "text-black"
//                         }`}
//                       />
//                     )}
//                     {index === 1 && (
//                       <AiOutlineDiscord
//                         size={24}
//                         className={`absolute left-3 ${
//                           !column.enabled ? "text-gray-400" : "text-black"
//                         }`}
//                       />
//                     )}
//                     {index === 2 && (
//                       <AiOutlineYoutube
//                         size={24}
//                         className={`absolute left-3 ${
//                           !column.enabled ? "text-gray-400" : "text-black"
//                         }`}
//                       />
//                     )}
//                     {index === 3 && (
//                       <CiTwitter
//                         size={24}
//                         className={`absolute left-3 ${
//                           !column.enabled ? "text-gray-400" : "text-black"
//                         }`}
//                       />
//                     )}
//                     {index === 4 && (
//                       <IoLogoInstagram
//                         size={24}
//                         className={`absolute left-3 ${
//                           !column.enabled ? "text-gray-400" : "text-black"
//                         }`}
//                       />
//                     )}

//                     <input
//                       type="text"
//                       value={column.value}
//                       onChange={(e) => handleInputChange(index, e.target.value)}
//                       disabled={!column.enabled}
//                       className={`block w-full pl-12 border rounded-lg shadow-sm p-4 text-lg ${
//                         column.enabled
//                           ? "border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
//                           : "bg-gray-100 border-gray-200 text-gray-400"
//                       }`}
//                       placeholder="https://www.example.com/"
//                     />
//                   </div>
//                 </div>
//               ))}
//             {/* Update Button */}
//             <button
//               type="submit"
//               className="mt-6 bg-call-to-actions-900 text-white py-3 px-5 rounded-md text-sm font-medium hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400"
//             >
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProfilePage;
