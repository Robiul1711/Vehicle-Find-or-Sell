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
import { useApiMutation } from "@/hooks/useApiMutation";
import { Link } from "react-router-dom";

const DasCarCard = ({ car }) => {
  const { mutate, isPending } = useApiMutation({
    url: `/ads/vehicles/${car?.id}/`,
    method: "DELETE",
    secure: true,
    invalidateKeys: ["ads-vehicles"],
  });

  return (
    // Added 'flex flex-col h-full' to the main container
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition flex flex-col h-full">
      {/* Image */}
      <div className="w-full h-64 overflow-hidden flex-shrink-0">
        <img
          src={IMG_URL + car?.media?.image?.[0]?.file}
          alt={car?.brand_name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Area - Added 'flex-grow' and 'flex flex-col' */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Top Content (Title + Subtitle) */}
        <div className="flex-grow space-y-2">
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-semibold text-gray-900 leading-tight">
              {car?.brand_name} {car?.model}
            </h2>
            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
              <Bumpcon />
              <VideoIcon />
              <ProfetionalIcon />
            </div>
          </div>
          <p className="text-gray-500 text-sm line-clamp-2">{car?.subtitle}</p>
        </div>

        {/* Bottom Section (Features + Price + Buttons) - This stays at the bottom */}
        <div className="mt-auto">
          {/* Features */}
          <div className="flex items-center justify-between text-gray-700 text-sm mt-3 border-t pt-3 border-b pb-3">
            <div className="flex flex-col items-center gap-1">
              <MilageIcon />
              <span>{car?.mileage}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <FuelIcon />
              <span>{car?.fuel_type}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <AutomaticIcon />
              <span>{car?.transmission}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <NewIcon />
              <span>{car?.condition}</span>
            </div>
          </div>

          {/* Price */}
          <p className="text-2xl font-bold text-gray-900 mt-3">
            {car?.discount_price}
          </p>

          {/* Buttons Grid */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <Link
              to={`/dashboard/car-details/${car?.id}`}
              className="bg-gray-900 text-center text-white text-sm font-medium rounded-lg py-2 hover:bg-gray-800 transition-colors"
            >
              View Details
            </Link>
            <Link
              to={`/dashboard/edit-ads/${car?.id}`}
              className="bg-gray-900 text-center text-white text-sm font-medium rounded-lg py-2 hover:bg-gray-800 transition-colors"
            >
              Edit
            </Link>
            <button className="bg-gray-900 text-white text-sm font-medium rounded-lg py-2 hover:bg-gray-800 transition-colors">
              Pause Ad
            </button>
            <button
              onClick={() => mutate()}
              disabled={isPending}
              className={`text-white text-sm font-medium rounded-lg py-2 transition-colors ${
                isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-900 hover:bg-red-700"
              }`}
            >
              {isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DasCarCard;
