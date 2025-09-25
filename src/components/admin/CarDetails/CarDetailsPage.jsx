import React from "react";
import CarLeftSideImages from "./CarLeftSideImages";
import CarRightSideDetails from "./CarRightSideDetails";
import CarBottomFeatures from "./CarBottomFeatures";

const CarDetailsPage = () => {
  return (
    <div className=" ">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Images */}
        <div className="w-full lg:w-1/2">
          <CarLeftSideImages />
        </div>

        {/* Right Details */}
        <div className="w-full lg:w-1/2">
          <CarRightSideDetails />
        </div>
      </div>

      {/* Bottom Features */}
      <div className="mt-12">
        <CarBottomFeatures />
      </div>
    </div>
  );
};

export default CarDetailsPage;
