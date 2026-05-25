import CommonButton from "@/components/common/CommonButton";
import Title from "@/components/common/Title";
import React from "react";
import DasCarCard from "./DasCarCard";
import { useApiQuery } from "@/hooks/useApiQuery";
import { Car, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const MyRecentListings = () => {
  const { data, isLoading } = useApiQuery({
    queryKey: ["my-ads"],
    url: "/ads/my-ads/",
    secure: true,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Title level="title24"> My Recent Listings</Title>
        <CommonButton link={"/dashboard/my-adds"} variant="primary">
          View All
        </CommonButton>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {
          data?.data?.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="bg-gray-100 rounded-full p-5 mb-4">
                <Car size={40} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No ads yet
              </h3>
              <p className="text-gray-500 text-sm max-w-sm">
                You haven't added any ads yet. Browse cars and save the ones you
                love to your favorites list.
              </p>
            </div>
          ) : (
            data?.data?.slice(0, 3).map((car) => (
              <DasCarCard key={car.id} car={car} />
            ))
          )
        }
      </div>
    </div>
  );
};

export default MyRecentListings;
