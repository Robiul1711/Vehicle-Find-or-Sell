import React from "react";
import CarLeftSideImages from "./CarLeftSideImages";
import CarRightSideDetails from "./CarRightSideDetails";
import CarBottomFeatures from "./CarBottomFeatures";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useParams } from "react-router-dom";

const CarDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useApiQuery({
    queryKey: ["profile", id],
    url: `/ads/vehicles/${id}`,
    secure: true,
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Skeleton */}
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] bg-gray-200 rounded-xl" />
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="md:w-28 w-24 md:h-24 h-20 bg-gray-200 rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Right Skeleton */}
          <div className="w-full lg:w-1/2 space-y-6 mt-5 md:mt-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="h-10 w-64 bg-gray-200 rounded-lg" />
              <div className="flex gap-2">
                <div className="h-10 w-32 bg-gray-200 rounded-lg" />
                <div className="h-10 w-32 bg-gray-200 rounded-lg" />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <div className="h-8 w-14 bg-gray-200 rounded" />
              <div className="h-8 w-14 bg-gray-200 rounded" />
            </div>
            <div className="h-12 w-48 bg-gray-200 rounded-lg mt-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-8">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className="h-6 w-full bg-gray-200 rounded" />
                ))}
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className="h-6 w-full bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Skeleton */}
        <div className="mt-12 space-y-12">
          <div className="space-y-6">
            <div className="h-8 w-48 bg-gray-200 rounded" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-6 w-32 bg-gray-200 rounded" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-2/3 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 w-64 bg-gray-200 rounded" />
            <div className="h-20 w-full bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20 text-red-500">
        Error loading car details. Please try again later.
      </div>
    );
  }

  return (
    <div className=" ">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Images */}
        <div className="w-full lg:w-1/2">
          <CarLeftSideImages data={data} isLoading={isLoading} />
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
