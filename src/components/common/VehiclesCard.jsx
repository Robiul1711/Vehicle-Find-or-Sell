import React from "react";
import { Heart, Gauge, Droplets, Settings, ArrowUpRight } from "lucide-react";
import {
  AutomaticIcon,
  Bumpcon,
  FireIcon,
  FuelIcon,
  MilageIcon,
} from "./SVGicons/MySvg";
import { Link } from "react-router-dom";

const VehiclesCard = ({
  id,
  slug,
  imageUrl,
  title,
  subtitle,
  mileage,
  fuelType,
  transmission,
  price,
  originalPrice,
  discountPrice,
  isNew,
  onViewDetails,
  onFavorite,
  path,
  isFavorite,
}) => {
  return (
    <Link to={`/${path || "details"}/${id}/${slug}`} className="rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
      {/* Image */}
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-58 object-cover" />
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite();
          }}
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-all duration-300 group z-10"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${isFavorite ? "text-custom-primary fill-custom-primary" : "text-gray-600 group-hover:text-custom-primary group-hover:fill-custom-primary"}`}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
        {/* Title & Badge */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">{title}</h3>
          {isNew && (
            <span className="size-8 bg-gray-100 rounded-full flex items-center justify-center">
              {" "}
              <Bumpcon className="w-5 h-5" />
            </span>
          )}
        </div>
         
        {/* Subtitle */}
        {
          subtitle && (
            <p className="text-gray-600 text-sm  leading-relaxed line-clamp-1">
              {subtitle}
            </p>
          )
        }

        {/* Features */}
        <div className={` flex justify-between items-center my-3 py-3 `} >
          
          <Feature icon={<MilageIcon />} label={mileage} />
          <Feature icon={<FuelIcon />} label={fuelType} />
          <Feature icon={<AutomaticIcon />} label={transmission} />
        </div>

        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between">
          {/* Price Section */}

        <div className="flex items-baseline gap-2 mb-2">
 
          {discountPrice ? (
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              €{discountPrice}
            </span>
          ) : (
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              €{originalPrice}
            </span>
          )}
        </div>
    
          <Link
            to={`/${path || "details"}/${id}/${slug}`}
            onClick={onViewDetails}
            className="flex items-center text-custom-primary font-medium hover:text-blue-700 transition-colors"
          >
            <span className="mr-2">View Details</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </Link>
  );
};

// small reusable feature component
const Feature = ({ icon, label }) => (
  <>
  {
    label && (
        <div className="flex flex-col items-center">
  
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
          {React.cloneElement(icon, { className: "w-5 h-5 text-gray-600" })}
        </div>
        <span className="text-sm text-gray-700 font-medium">{label}</span>
   </div>
   
      )
    }
  </>
);

export default VehiclesCard;
