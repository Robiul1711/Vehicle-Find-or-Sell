import React from "react";
import dasboardCoach from "@/assets/images/dashboardBanner.png";
import CommonButton from "@/components/common/CommonButton";
import { CiCirclePlus } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
const DashBanner = () => {
  return (
    <div
      className="rounded-2xl flex flex-col md:flex-row justify-between items-center text-white bg-custom-primary md:gap-10"
     
    >
      {/* Text Section */}
      <div className="w-full md:w-1/2 space-y-4 text-center md:text-left p-8 md:p-12 ">
        <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold ">
        Control Your Buying & Selling
        </h1>
        <p className="leading-relaxed text-sm md:text-base xl:text-2xl">
        Post ads, explore listings, and manage everything in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <CommonButton variant="secondary"><CiCirclePlus className="text-2xl"/>View Dashboard</CommonButton>
            <CommonButton variant="secondary"><CiSearch className="text-2xl"/>Browse Listings</CommonButton>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full h-full md:w-1/2 flex justify-end">
        <img
          src={dasboardCoach}
          alt="Coach Banner"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default DashBanner;