import { HeroBanner } from "./components/section-1";
import { SectionTwoForm } from "./components/section-2";
import { SectionThreeForm } from "./components/section-3";
import { SectionFourForm } from "./components/section-4";
import { SectionFiveForm } from "./components/section-5";
import { SectionSixForm } from "./components/section-6";
import { SectionSevenForm } from "./components/section-7";
import { SectionEightForm } from "./components/section-8";

// Breadcrumb Component
const Breadcrumb = () => {
  return (
    <div className="p-6 bg-white">
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-neutral-700">
          <span>Pages</span>
          <span>/</span>
          <span className="font-bold">Home</span>
        </div>
        <h1 className="text-2xl font-semibold mt-2">Home</h1>
      </div>
    </div>
  );
};

// Modified Home Section Component
export const HomeSection = () => {
  return (
    <div className="text-[#262626]">
      <Breadcrumb />
      <div className="-mt-2">
        <HeroBanner />
      </div>
      <div className="mt-8">
        <SectionTwoForm />
      </div>
      <div className="mt-8">
        <SectionThreeForm />
      </div>
      <div className="mt-8">
        <SectionFourForm />
      </div>
      <div className="mt-8">
        <SectionFiveForm />
      </div>
      <div className="mt-8">
        <SectionSixForm />
      </div>
      <div className="mt-8">
        <SectionSevenForm />
      </div>
      <div className="mt-8">
        <SectionEightForm />
      </div>
      <div className="mt-8">
        <ActionButtons />
      </div>
    </div>
  );
};

// Action Buttons Component
const ActionButtons = () => {
  return (
    <div className="flex justify-end gap-4 py-6">
      <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
        Cancel
      </button>
      <button className="px-4 py-2 bg-[#E9B824] text-white rounded-md hover:bg-[#d6a820]">
        Update
      </button>
    </div>
  );
};
