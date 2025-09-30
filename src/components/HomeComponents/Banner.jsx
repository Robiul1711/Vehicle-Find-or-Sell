import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import banner from "@/assets/images/banner.png";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";

const Banner = () => {
  return (
<section className="w-full relative bg-white">
  {/* Desktop layout */}
  <div className="hidden md:flex flex-row justify-between items-center section-padding-x">
    {/* Left Content */}
    <div className="w-1/2 flex flex-col justify-center space-y-6 text-left">
      <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
        Buy or sell vehicles today – fast, simple, trusted.
      </p>

      <Title level="title70" className="max-w-[750px]">
        Find or Sell Your Vehicle Fast & Easy!
      </Title>

      <div className="flex gap-4">
        <CommonButton
          link="/dashboard/create-ads"
          variant="primary"
          className="flex items-center gap-2"
        >
          Post Your Ad <MdOutlineArrowOutward />
        </CommonButton>
        <CommonButton className="flex items-center gap-2">
          Browse Listings <MdOutlineArrowOutward />
        </CommonButton>
      </div>
    </div>

    {/* Right Content */}
    <div className="w-1/2 flex justify-end">
      <img
        src={banner}
        alt="Car banner"
        className="w-full max-w-full object-contain"
      />
    </div>
  </div>

  {/* Mobile layout */}
  <div className="md:hidden relative w-full h-[400px] flex items-center justify-center">
    {/* Blurred Background */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url(${banner})`,
        filter: "blur(6px)",
      }}
    ></div>

    {/* Overlay for better contrast */}
    <div className="absolute inset-0 bg-black/40"></div>

    {/* Text content */}
    <div className="relative z-10 text-center px-4">
      <p className="text-white text-lg font-medium mb-2">
        Buy or sell vehicles today – fast, simple, trusted.
      </p>
      <Title level="title40" className="text-white mb-4">
        Find or Sell Your Vehicle Fast & Easy!
      </Title>
      <div className="flex  gap-3 sm:flex-row justify-center">
        <CommonButton
          link="/dashboard/create-ads"
          variant="primary"
          className="flex items-center gap-2 justify-center border border-white text-white"
        >
          Post Your Ad <MdOutlineArrowOutward />
        </CommonButton>
        <CommonButton className="flex items-center gap-2 justify-center border-white text-white">
          Browse Listings <MdOutlineArrowOutward />
        </CommonButton>
      </div>
    </div>
  </div>
</section>


  );
};

export default Banner;
