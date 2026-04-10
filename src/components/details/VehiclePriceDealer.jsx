import React from "react";
import { MessageCircle, ExternalLink } from "lucide-react";
import { OfferIcon } from "../common/SVGicons/CarSvg";
import ImageAvatar from "@/assets/images/dummy.png";
import { Link } from "react-router-dom";

const VehiclePriceDealer = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-10 animate-pulse">
        {/* Price Section Skeleton */}
        <div className="mb-6">
          <div className="h-4 w-20 bg-gray-300 rounded mb-2" />
          <div className="flex items-baseline gap-2 mb-2">
            <div className="h-4 w-12 bg-gray-200 rounded" />
            <div className="h-10 w-32 bg-gray-300 rounded" />
          </div>
          <div className="h-4 w-40 bg-gray-200 rounded" />
        </div>

        {/* Offer Button Skeleton */}
        <div className="h-14 w-full bg-gray-300 rounded-lg mb-6" />

        {/* Dealer Info Section Skeleton */}
        <div className="mb-6">
          <div className="flex flex-col items-start gap-4 mb-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full" />
            <div className="space-y-2">
              <div className="h-5 w-32 bg-gray-300 rounded" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Contact Buttons Skeleton */}
          <div className="space-y-3 mb-4">
            <div className="h-12 w-full bg-gray-200 rounded-lg" />
            <div className="h-12 w-full bg-gray-200 rounded-lg" />
          </div>

          {/* View All Stock Link Skeleton */}
          <div className="h-4 w-40 bg-gray-200 rounded mx-auto" />
        </div>

        {/* Vehicle History Button Skeleton */}
        <div className="h-14 w-full bg-gray-300 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-10 ">
      {/* Price Section */}
      <div className="mb-6">
        {console.log(data)}
        <div className="text-sm text-gray-500 mb-1">Our Price</div>
        <div className="flex items-baseline gap-2 mb-2">
          {data?.original_price && data?.discount_price && (
            <span className="text-sm text-gray-400 line-through">
              €{data?.original_price}
            </span>
          )}
          {data?.discount_price ? (
            <span className="text-2xl font-bold text-gray-900">
              €{data?.discount_price}
            </span>
          ) : (
            <span className="text-2xl font-bold text-gray-900">
              €{data?.original_price}
            </span>
          )}
        </div>
        {data?.discount_price && (
          <div className="text-sm text-orange-500 font-medium">
            Instant Saving €{data?.original_price - data?.discount_price}
          </div>
        )}
      </div>

      {/* Make Offer Button */}
      <p className="w-full bg-[#F88E08]  text-white font-medium py-3 px-4 rounded-lg mb-6 flex items-center justify-center gap-2 transition-colors">
        <span className="text-lg">
          <OfferIcon />
        </span>
        Make An Offer Price
      </p>

      {/* Dealer Info Section */}
      <div className="mb-6">
        <div className="flex flex-col items-start gap-3 mb-4">
          <img
            src={data?.contact?.profile_image || ImageAvatar}
            alt="Katie Sims"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="font-medium text-gray-900">
              {data?.contact?.name}
            </div>
            <div className="text-sm text-gray-500">
              {data?.contact?.account_type}
            </div>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="space-y-3 mb-4">
          <Link
            to="/dashboard/message"
            className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle size={18} />
            Message Dealer
          </Link>

          <button
            onClick={() =>
              window.open(
                `https://wa.me/${data?.contact?.phone}?text=Hi%2C%20I%27m%20interested%20in%20your%20car!`,
                "_blank",
              )
            }
            className="w-full border border-green-300 hover:border-green-400 bg-green-50 hover:bg-green-100 text-green-700 font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle size={18} />
            Chat Via WhatsApp
          </button>
        </div>

        {/* View All Stock Link */}
        <Link
          to={`/dealer-profile/${data?.profile_id}`}
          className="text-sm text-gray-600 hover:text-gray-800 flex items-center justify-center gap-1 w-full"
        >
          View All stock at this dealer
          <ExternalLink size={14} />
        </Link>
      </div>

      {/* Vehicle History Button */}
      <Link
        to={`/aditionalservices/vehicle-maintenance-history`}
        className="w-full bg-[#012853] block text-center hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        Get Vehicle History
      </Link>
    </div>
  );
};

export default VehiclePriceDealer;
