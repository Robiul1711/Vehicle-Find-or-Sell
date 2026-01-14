import React from "react";
import CarLeftSideImages from "./CarLeftSideImages";
import CarRightSideDetails from "./CarRightSideDetails";
import CarBottomFeatures from "./CarBottomFeatures";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useParams } from "react-router-dom";

const CarDetailsPage = () => {
  const { id } = useParams();
    const { data, isLoading , isError} = useApiQuery({

    queryKey: ["profile" , id],
    url: `/store/vehicle/${id}`,
    secure: true,
  });
// console.log(data)
  return (
    <div className=" ">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Images */}
        <div className="w-full lg:w-1/2">
          <CarLeftSideImages data={data} />
        </div>

        {/* Right Details */}
        <div className="w-full lg:w-1/2">
          <CarRightSideDetails details={data} />
        </div>
      </div>

      {/* Bottom Features */}
      <div className="mt-12">
        <CarBottomFeatures details={data} />
      </div>
    </div>
  );
};

export default CarDetailsPage;
