import React, { useState } from "react";
import CarLeftSideImages from "../admin/CarDetails/CarLeftSideImages";
import Title from "../common/Title";
import {
  ManualIcon,
  MilesIcons,
  PetrolIcon,
  WarrentiesIcon,
} from "../common/SVGicons/CarSvg";
import { Bumpcon, VideoIcon } from "../common/SVGicons/MySvg";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { useApiMutation } from "@/hooks/useApiMutation";
import VehiclePriceDealer from "./VehiclePriceDealer";

const PartsDetailsRowOne = ({ details, data, refetch }) => {
  // Toggle favorite mutation
  const { mutate, isPending } = useApiMutation({
    url: "/account/favorites/toggle/",
    method: "POST",
    secure: true,
    successMessage: "Toggle favorite success!",
    onSuccess: () => {
      if (refetch) refetch();
    },
  });

  const isFavorite = data?.is_favourite || data?.is_favorite || false;
  const favType = details === "parts" ? "part" : "vehicle";

  const onAddFavorite = () => {
    if (data?.id) {
      mutate({ id: data.id, type: favType });
    }
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
        // console.log("Share canceled");
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
    <div className="flex w-full xmd:flex-row flex-col gap-5 mt-6">
      <div className="xmd:w-[60%] w-full flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <Title level="title40" className="!font-bold">
            {data?.part_name}
          </Title>

          {/* Status Badges */}
          <div className="flex gap-2 mb-2">
            {data?.is_bumped && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#012853]/10 text-[#012853] text-xs font-medium rounded-full" title="Boosted">
                <Bumpcon className="w-4 h-4" />
                Boosted
              </span>
            )}
            {data?.is_video && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-orange-50 to-yellow-50 text-orange-600 text-xs font-medium rounded-full" title="Has Video">
                <VideoIcon className="w-4 h-4" />
                Video
              </span>
            )}
          </div>

          <div className="flex w-full gap-6 justify-end">
            {/* Car Info Badges */}
            {/* <div className="flex flex-wrap gap-3">
              {carInfo.map((info) => (
                <div
                  key={info.id}
                  className="flex items-center bg-[rgba(248,142,8,0.10)] gap-2 border px-3 py-1 rounded-lg"
                >
                  <info.icon />
                  <span className="text-[#F88E08]">{info.value}</span>
                </div>
              ))}
            </div> */}

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

        <CarLeftSideImages details={details} data={data} />
      </div>

      <div className="xmd:w-[40%] w-full">
        <VehiclePriceDealer data={data} details={details} />
      </div>
    </div>
  );
};

export default PartsDetailsRowOne;
