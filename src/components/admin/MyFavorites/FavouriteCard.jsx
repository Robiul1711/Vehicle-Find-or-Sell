import {
  AutomaticIcon,
  Bumpcon,
  FuelIcon,
  MilageIcon,
  NewIcon,
  ProfetionalIcon,
  VideoIcon,
} from "@/components/common/SVGicons/MySvg";
import { ArrowUpRight, Heart } from "lucide-react";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
const FavouriteCard = ({ car }) => {
    const [isfavorite, setFavorite] = useState(false);
    const handleClick = () => {
        if (isfavorite) {
          setFavorite(false);
        } else {
          setFavorite(true);
        }
    }
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition relative">
      {/* Image */}
      <div className="w-full h-64 overflow-hidden relative">
        <img
          src={car.image}
          alt={car.title}
          className="w-full h-full object-cover"
        />
        {/* Favourite Heart Icon */}
        <button onClick={handleClick} className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-200 transition">
            {
                isfavorite ? (
                    <FaHeart className="w-5 h-5 text-custom-primary " />
                ) : (
                    <FaRegHeart className="w-5 h-5 text-custom-primary " />
                )
            }

        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Title + Subtitle */}
        <div>
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold text-gray-900">{car.title}</h2>
            <div className="flex items-center gap-2">
              <Bumpcon />
              <VideoIcon />
              <ProfetionalIcon />
            </div>
          </div>
          <p className="text-gray-500 text-sm truncate">{car.subtitle}</p>
        </div>

        {/* Features */}
        <div className="flex items-center justify-between text-gray-700 text-sm mt-3 border-t pt-3 border-b pb-3">
          <div className="flex flex-col items-center gap-1">
            <MilageIcon />
            <span>{car.miles}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <FuelIcon />
            <span>{car.fuel}</span>
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

        {/* Price & Button */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">{car.price}</span>
          <button className="flex items-center text-custom-primary font-medium hover:text-blue-700 transition-colors">
            <span className="mr-2">View Details</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavouriteCard;
