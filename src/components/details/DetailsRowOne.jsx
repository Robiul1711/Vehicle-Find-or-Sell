import React, { useState } from "react";
import CarLeftSideImages from "../admin/CarDetails/CarLeftSideImages";
import Title from "../common/Title";
import {
  ManualIcon,
  MilesIcons,
  PetrolIcon,
  WarrentiesIcon,
} from "../common/SVGicons/CarSvg";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { FaRegShareFromSquare } from "react-icons/fa6";
import VehiclePriceDealer from "./VehiclePriceDealer";
import { useApiMutation } from "@/hooks/useApiMutation";

const DetailsRowOne = ({ details, data, refetch, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex w-full xmd:flex-row flex-col gap-5 mt-14">
        <div className="xmd:w-[60%] w-full flex flex-col gap-6">
          <div className="flex flex-col gap-4 animate-pulse">
            {/* Title Skeleton */}
            <div className="h-10 w-3/4 bg-gray-300 rounded-lg" />

            <div className="flex w-full gap-6 justify-between items-center">
              {/* Car Info Badges Skeleton */}
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-9 w-28 bg-gray-200 rounded-lg" />
                ))}
              </div>

              {/* Buttons Skeleton */}
              <div className="flex gap-3">
                <div className="h-10 w-12 bg-gray-200 rounded-lg" />
                <div className="h-10 w-12 bg-gray-200 rounded-lg" />
              </div>
            </div>
          </div>

          <CarLeftSideImages isLoading={true} />
        </div>

        {/* Sidebar Skeleton (Price & Dealer) */}
        <div className="xmd:w-[40%] w-full">
          <VehiclePriceDealer isLoading={true} />
        </div>
      </div>
    );
  }

  // add favorite
  const { mutate, isPending } = useApiMutation({
    url: "/account/favorites/toggle/",
    method: "POST",
    secure: true,
    successMessage: "Toggle favorite success!",
    onSuccess: () => {
      if (refetch) refetch();
    },
  });

  const isFavorite = data?.is_favorite || false;
  const favType = details === "parts" ? "part" : "vehicle";

  const onAddFavorite = () => {
    if (data?.id) {
      mutate({ id: data.id, type: favType });
    }
  };
// console.log(data)
  const carInfo = [
    { id: 1, icon: MilesIcons, value: data?.mileage },
    { id: 2, icon: ManualIcon, value: data?.transmission },
    { id: 3, icon: PetrolIcon, value: data?.fuel_type },
    { id: 4, icon: WarrentiesIcon, value: data?.exact_date },
  ];

  // Favorite Toggle Function
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Share Button Function
  const handleShare = async () => {
    const shareUrl = window.location.href; // Current page URL
    const shareText = "Check out this car: Toyota Corolla 2020";

    if (navigator.share) {
      // ✅ Mobile/Modern Browsers
      try {
        await navigator.share({
          title: "Car Details",
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.log("Share canceled");
      }
    } else {
      // ✅ Desktop – Copy to Clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      } catch {
        alert("Failed to copy link");
      }
    }
  };

  return (
    <div className="flex w-full xmd:flex-row flex-col gap-5 mt-14">
      <div className="xmd:w-[60%] w-full flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <Title level="title40" className="!font-bold">
            {data?.brand_name} {data?.model}
          </Title>

          <div className="flex w-full gap-6 justify-between">
            {/* Car Info Badges */}
            <div className="flex flex-wrap gap-3">
              {carInfo.map((info) => (
                <div
                  key={info.id}
                  className="flex items-center bg-[rgba(248,142,8,0.10)] gap-2 border px-3 py-1 rounded-lg"
                >
                  <info.icon />
                  <span className="text-[#F88E08]">{info.value}</span>
                </div>
              ))}
            </div>

            {/* Buttons Section */}
            <div className="flex gap-3 flex-wrap items-center">
              {/* Favorite Button */}
              <button
                onClick={onAddFavorite}
                disabled={isPending}
                className={`flex items-center gap-2 border px-3 py-1 rounded-lg transition ${
                  isFavorite ? "bg-red-100 border-red-400" : ""
                }`}
              >
                {isFavorite ? (
                  <MdFavorite size={22} className="text-red-500" />
                ) : (
                  <MdFavoriteBorder size={22} />
                )}
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="flex items-center gap-2 border px-3 py-1 rounded-lg hover:bg-gray-100 transition"
              >
                <FaRegShareFromSquare size={20} />
              </button>
            </div>
          </div>
        </div>

        <CarLeftSideImages details={details} data={data} isLoading={isLoading} />
      </div>

      <div className="xmd:w-[40%] w-full">
        <VehiclePriceDealer data={data} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default DetailsRowOne;
