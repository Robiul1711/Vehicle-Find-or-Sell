import {
  AutomaticIcon,
  Bumpcon,
  FuelIcon,
  MilageIcon,
  NewIcon,
  ProfetionalIcon,
  VideoIcon,
} from "@/components/common/SVGicons/MySvg";
import { Link } from "react-router-dom";

const VechleBoostCard = ({ car }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition h-full flex flex-col">
      {/* Image */}
      <div className="w-full h-64 overflow-hidden shrink-0">
        <img
          src={car?.thumbnail}
          alt={car?.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title + Subtitle */}
        <div>
          <div className="flex  justify-between">
            <h2 className="text-lg font-semibold text-gray-900">{car.title}</h2>
            <div className="flex items-center gap-2 ">
           {car?.is_bump && <Bumpcon />}
              {car?.is_video && <VideoIcon />}
              {car?.is_featured && <ProfetionalIcon />}
            </div>
          </div>
          <p className="text-gray-500 text-sm truncate">{car.subtitle}</p>
        </div>

        {/* Features */}
        <div className="flex items-center justify-between text-gray-700 text-sm mt-3 mb-2 border-t pt-3 border-b pb-3">
          <div className="flex flex-col items-center gap-1">
            <MilageIcon />
            <span>{car.mileage}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <FuelIcon />
            <span>{car.fuel_type}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <AutomaticIcon />
            <span>{car.transmission}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <NewIcon />
            <span>{car.condition}</span>
          </div>
        </div>

        <div className="mt-auto">
          {/* Price */}
          <p className="text-2xl font-bold text-gray-900 mt-2">{car.price}</p>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <Link
            to={`/dashboard/car-details/${car.id}`}
            className="bg-gray-900 text-center text-white text-sm font-medium rounded-lg py-2 hover:bg-gray-800"
          >
            View Details
          </Link>
          {/* Updated Boost Ads Link */}
          <Link
            to={`/dashboard/boost-your-ad-visibility/${car.id}?type=${car.ad_type}`}
            className="bg-gray-900 text-center text-white text-sm font-medium rounded-lg py-2 hover:bg-gray-800"
          >
            Boost Ads
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default VechleBoostCard;
