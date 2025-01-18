import {HeroBanner} from "./components/section-1";
import {SectionTwoForm} from "./components/section-2";
import {SectionThreeFrom} from "./components/section-3";
import {SectionFourForm} from "./components/section-4";
import {SectionFiveForm} from "./components/section-5";
import {SectionSixForm} from "./components/section-6";
import {SectionSevenForm} from "./components/section-7";
import {SectionEightForm} from "./components/section-8";

export const HomeSection = () => {
  return (
    <div className="text-[#262626]">
      <HeroBanner />
      <SectionTwoForm />
      <SectionThreeFrom />
      <SectionFourForm />
      <SectionFiveForm />
      <SectionSixForm />
      <SectionSevenForm />
      <SectionEightForm />
    </div>
  );
};
