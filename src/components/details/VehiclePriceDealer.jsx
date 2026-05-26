import React from "react";
import { MessageCircle, ExternalLink, Bell } from "lucide-react";
import { OfferIcon } from "../common/SVGicons/CarSvg";
import ImageAvatar from "@/assets/images/dummy.png";
import { Link } from "react-router-dom";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

const VehiclePriceDealer = ({ data, isLoading, details }) => {
  const { user } = useAuth();
  
  const { mutate: mutatePriceDrop, isPending: isPendingPriceDrop } = useApiMutation({
    url: "/alerts/price-drop/",
    method: "POST",
    secure: true,
    successMessage: "Price drop alert set successfully!",
  });

  const onNotifyPriceDrop = () => {
    if (!user) {
      toast.error("Please create an account to set alerts.");
      return;
    }
    if (data?.id) {
      mutatePriceDrop({
        ad_type: details === "parts" ? "parts" : "vehicle",
        ad_id: data.id,
      });
    }
  };

  const { mutate: mutateSimilar, isPending: isPendingSimilar } = useApiMutation({
    url: `/alerts/similar/${details === "parts" ? "parts" : "vehicle"}/${data?.id}/`,
    method: "POST",
    secure: true,
    successMessage: "Similar listings alert set successfully!",
  });

  const onNotifySimilar = () => {
    if (!user) {
      toast.error("Please create an account to set alerts.");
      return;
    }
    if (data?.id) {
      mutateSimilar({});
    }
  };

    const { mutate, isPending } = useApiMutation({
      url: "/message/conversations/get-or-create/",
      method: "POST",
      secure: true,
    });
  
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
    <div className="bg-white rounded-lg shadow-md md:p-10 p-5 ">
      {/* Price Section */}
      <div className="mb-6">
        {/* {console.log(data)} */}
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

      <div className="mb-6">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b pb-1">Stay Informed</h4>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
        <button
          onClick={onNotifyPriceDrop}
          disabled={isPendingPriceDrop}
          title="Price Drop Alert"
          className="flex  items-center justify-center gap-2 p-3 rounded-xl border border-custom-primary/20 bg-custom-primary/5 hover:bg-custom-primary text-custom-primary hover:text-white transition-all duration-300 group shadow-sm hover:shadow-orange-500/20"
        >
          <Bell size={20} className="animate-bounce" />
          <span className="font-bold text-[11px] uppercase tracking-wider">Alert on Price Drop</span>
        </button>

        <button
          onClick={onNotifySimilar}
          disabled={isPendingSimilar}
          title={`Similar ${details === "parts" ? "Parts" : "Vehicles"}`}
          className="flex  items-center justify-center gap-2 p-3 rounded-xl border border-blue-600/20 bg-blue-600/5 hover:bg-blue-600 text-blue-600 hover:text-white transition-all duration-300 group shadow-sm hover:shadow-blue-500/10"
        >
          <Bell size={20} className="animate-bounce" />
          <span className="font-bold text-[11px] uppercase tracking-wider">Alert on Similar {details === "parts" ? "Parts" : "Vehicles"}</span>
        </button>
      </div>
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
        {/* {console.log(data.seller_details)} */}
        <div className="flex flex-col items-start gap-3 mb-4">
          <img
            src={data?.seller_details?.profile_image || ImageAvatar}
            alt="Katie Sims"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="w-full flex flex-col gap-1">
             {
              data?.seller_details?.name && 
            <p className="text-sm text-gray-500"><span className="text-sm text-gray-500 font-bold">Name: </span> {data?.seller_details?.name}</p>
            }
            {
              data?.seller_details?.seller_type && 
            <div className="text-sm text-gray-500">
           <span className="text-sm text-gray-500 font-bold">Account Type: </span>    {data?.seller_details?.seller_type}
            </div>
            }
            {
              data?.seller_details?.phone && 
            <p className="text-sm text-gray-500"><span className="text-sm text-gray-500 font-bold">Phone: </span> {data?.seller_details?.phone}</p>
            }
            
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="space-y-3 mb-4">
          <Link
          to="/dashboard/message"
            onClick={() =>
              mutate({
                user_id: data?.user,
              })
            }
            className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle size={18} />
            Message Dealer
          </Link>
{/* {console.log(data)} */}
          <button
            onClick={() =>
              window.open(
                `https://wa.me/${data?.seller_details?.phone}?text=Hi%2C%20I%27m%20interested%20in%20your%20car!`,
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
          to={`/dealer-profile/${data?.profile_id}/${data?.slug}`}
          className="text-sm text-gray-600 hover:text-gray-800 flex items-center justify-center gap-1 w-full border border-gray-200 py-2 px-4 rounded-lg"
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
