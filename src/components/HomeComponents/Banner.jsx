import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import banner from "@/assets/images/banner.png";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";

const Banner = () => {
  return (
    <section className="w-full bg-white ">
      <div className="flex   justify-between ">
        
{/* Left Content */}
<div className="w-full md:w-1/2 flex flex-col section-padding-x justify-center space-y-6 ">
  <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
    Buy or sell vehicles today – fast, simple, trusted.
  </p>

  <Title level="title70" className="max-w-[750px]">
    Find or Sell Your Vehicle Fast & Easy!
  </Title>

  <div className="flex flex-col sm:flex-row gap-4">
    <CommonButton variant="primary" className="flex items-center gap-2">
      Post Your Ad <MdOutlineArrowOutward />
    </CommonButton>
    <CommonButton className="flex items-center gap-2">
      Browse Listings <MdOutlineArrowOutward />
    </CommonButton>
  </div>
</div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 ">
          <img
            src={banner}
            alt="Car banner"
            className=""
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
