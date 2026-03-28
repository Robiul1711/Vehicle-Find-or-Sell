import {
  AutomaticIcon,
  Bumpcon,
  FuelIcon,
  MilageIcon,
  NewIcon,
  ProfetionalIcon,
  VideoIcon,
} from "@/components/common/SVGicons/MySvg";
import { useApiMutation } from "@/hooks/useApiMutation";
import { Link } from "react-router-dom";

const DasCarCard = ({ car }) => {
  const { mutate, isPending } = useApiMutation({
    url: `${car?.ad_type === "parts" ? `/ads/parts/${car?.id}/` : `/ads/vehicles/${car?.id}/`}`,
    method: "DELETE",
    secure: true,
    invalidateKeys: ["my-ads", "search-ads"],
  });
  // pause ads mutation
  const { mutate: pauseMutate, isPending: pausePending } = useApiMutation({
    url: `${car?.ad_type === "parts" ? `/ads/pause/parts/${car?.id}/` : `/ads/pause/vehicle/${car?.id}/`}`,
    method: "POST",
    secure: true,
    invalidateKeys: ["my-ads", "search-ads"],
  });

  return (
    // Added 'flex flex-col h-full' to the main container
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition flex flex-col h-full">
      {/* Image */}
      <div className="w-full h-64 overflow-hidden flex-shrink-0">
        <img
          src={car?.thumbnail}
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
              {car?.is_bump && <Bumpcon />}
              {car?.is_video && <VideoIcon />}
              {car?.is_featured && <ProfetionalIcon />}
            </div>
          </div>
          <p className="text-gray-500 text-sm line-clamp-2">{car?.subtitle}</p>
        </div>

        {/* Bottom Section (Features + Price + Buttons) - This stays at the bottom */}
        <div className="mt-auto">
          {/* Features */}
          <div className="flex items-center justify-between gap-2 text-gray-700 text-sm mt-3 border-t pt-3 border-b pb-3">
            {car?.mileage && (
              <div className="flex flex-col items-center gap-1">
                <MilageIcon />
                <span className="capitalize">{car?.mileage}</span>
              </div>
            )}
            {car?.fuel_type && (
              <div className="flex flex-col items-center gap-1">
                <FuelIcon />
                <span className="capitalize">{car?.fuel_type}</span>
              </div>
            )}
            {car?.transmission && (
              <div className="flex flex-col items-center gap-1">
                <AutomaticIcon />
                <span className="capitalize">{car?.transmission}</span>
              </div>
            )}
            {car?.condition && (
              <div className="flex flex-col items-center gap-1">
                <NewIcon />
                <span>{car?.condition}</span>
              </div>
            )}
          </div>

          {/* Price */}
          {car?.discount_price && (
            <p className="text-2xl font-bold text-gray-900 mt-3">
              {car?.discount_price}
            </p>
          )}

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
            <button
              onClick={() => pauseMutate()}
              disabled={pausePending}
              className={`text-sm font-medium rounded-lg py-2 transition-colors ${
                pausePending
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : car.is_pause
                    ? "bg-amber-500 text-white hover:bg-amber-600"
                    : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              {pausePending
                ? "Processing..."
                : car.is_pause
                  ? "Paused"
                  : "Pause Ad"}
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
