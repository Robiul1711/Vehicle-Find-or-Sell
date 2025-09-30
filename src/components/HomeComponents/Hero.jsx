import React from "react";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";
import { MdOutlineArrowOutward } from "react-icons/md";
import { CarOneIcon } from "../common/SVGicons/MySvg";

const heroData = [
  {
    id: 1,
    title: "Looking for a Car, Bike, Van, or Spare Parts?",
    desc: "Browse verified listings from private sellers and trusted professionals near you.",
    icon: <CarOneIcon className="size-10 sm:size-12 lg:size-16 xl:size-auto" />,
  },
  {
    id: 2,
    title: "Want to Sell Your Car, Bike, Van, or Parts?",
    desc: "Create your listing in minutes and connect with thousands of potential buyers.",
  icon: <CarOneIcon className="size-10 sm:size-12 lg:size-16 xl:size-auto" />,
  },
];
const Hero = () => {
  return (
    <div className="bg-[#F9FAFB] section-padding-x section-padding-y grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
      {heroData.map((item, index) => (
        <div
          key={index}
          className="bg-[#E9F2FF] rounded-2xl p-8 md:p-16 flex flex-col gap-6"
        >
          <Title level="title32">
            {item.title}
          </Title>
          <Title level="title18">
            {item.desc}
          </Title>
          <div className="flex items-center justify-between gap-4">
            <CommonButton variant="primary" className="flex items-center gap-2">
              Get Started <MdOutlineArrowOutward />
            </CommonButton>
            <div className="">{item.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;
