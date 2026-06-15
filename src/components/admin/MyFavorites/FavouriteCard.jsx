import {
  AutomaticIcon,
  Bumpcon,
  FuelIcon,
  MilageIcon,
  NewIcon,
  ProfetionalIcon,
  VideoIcon,
} from "@/components/common/SVGicons/MySvg";
import { IMG_URL } from "@/config/constant";
import { ArrowUpRight, Heart } from "lucide-react";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const FavouriteCard = ({ car }) => {
  // console.log(car?.content_object);

  // Determine if it's a part or a vehicle for the correct path
  const isPart =
    car?.content_type_name?.toLowerCase().includes("part") ||
    !!car?.content_object?.part_name;
  const detailsPath = isPart ? "/parts-details" : "/details";

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition relative h-full flex flex-col">
      {/* Image */}
      {console.log(car)}
      <div className="w-full h-64 overflow-hidden relative">
        <img
          src={
            car?.content_object?.media?.image?.[0]?.file
              ? car.content_object.media.image[0].file
              : ""
          }
          alt={
            car?.content_object?.model ||
            car?.content_object?.part_name ||
            "listing"
          }
          className="w-full h-full object-cover"
        />
        {/* Favourite Heart Icon */}
        <p className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-200 transition">
          <FaHeart className="w-5 h-5 text-custom-primary " />
        </p>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Title + Subtitle */}
          <div>
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {car?.content_object?.brand_name} {car?.content_object?.model ||
                  car?.content_object?.part_name ||
                  "N/A"}
              </h2>
              {console.log(car?.content_object)}
              <div className="flex items-center gap-2">
                  {car?.content_object?.is_bumped === true && (
                  <Bumpcon />
                )}
                  {car?.content_object?.is_video === true && (
                    <VideoIcon />
                  )}
                  {car?.content_object?.is_featured === true && (
                    <ProfetionalIcon />
                  )}
              </div>
            </div>
            <p className="text-gray-500 text-sm truncate line-clamp-2">
              {car?.content_object?.description || "No description available"}
            </p>
          </div>

          {/* Features */}
          <div className="flex items-center justify-between text-gray-700 text-sm mt-3 border-t pt-3 border-b pb-3">
            <div className="flex flex-col items-center gap-1">
              <MilageIcon />
              <span className="capitalize">
                {car?.content_object?.mileage ||
                  car?.content_object?.warrenty_duration ||
                  "0"}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <FuelIcon />
              <span className="capitalize">
                {car?.content_object?.fuel_type ||
                  car?.content_object?.weight ||
                  "N/A"}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <AutomaticIcon />
              <span className="capitalize">
                {car?.content_object?.engine_type ||
                  car?.content_object?.material ||
                  "N/A"}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <NewIcon />
              <span className="capitalize">{car?.content_object?.condition || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            €
            {car?.content_object?.discount_price ||
              car?.content_object?.original_price ||
              "0"}
          </span>
          <Link
            to={`${detailsPath}/${car?.content_object?.id}/${car?.content_object?.slug}`}
            className="flex items-center text-custom-primary font-medium hover:text-blue-700 transition-colors"
          >
            <span className="mr-2">View Details</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FavouriteCard;
