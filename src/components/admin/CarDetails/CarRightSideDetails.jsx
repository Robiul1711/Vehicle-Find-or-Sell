import React from "react";
import {
  Car,
  Gauge,
  Fuel,
  Calendar,
  Settings,
  Wind,
  Shield,
  Zap,
  FileText,
  User,
  Wrench,
  DoorOpen,
  Palette,
  Hash,
  Leaf,
  Users,
  Activity,
} from "lucide-react";
import { ProfetionalIcon, VideoIcon } from "@/components/common/SVGicons/MySvg";
import { Link, useParams } from "react-router-dom";





export default function CarRightSideDetails({details}) {
  const { id } = useParams();
  
const specs = [
  { icon: Car, label: "Body", value: details?.body },
  { icon: Gauge, label: "Mileage", value: details?.mileage },
  { icon: Fuel, label: "Fuel Type", value: details?.fuel_type },
  { icon: Calendar, label: "Year", value: details?.exact_date },
  { icon: Settings, label: "Transmission", value: details?.transmission },
  { icon: Wind, label: "Air Criteria", value: details?.air_criteria },
  { icon: Shield, label: "Warranty", value: details?.warrenty_duration },
  { icon: Zap, label: "Horsepower (CV)", value: details?.horsepower_cv },
  { icon: FileText, label: "Deductible VAT", value: details?.vat_percentage },
];

const rightSpecs = [
  { icon: User, label: "Condition", value: details?.condition },
  { icon: Wrench, label: "Engine Size", value: details?.engine_transmission?.Engine?.Cylinders
 },
  { icon: DoorOpen, label: "Door", value: "4 Doors" },
  { icon: Palette, label: "Color", value: details?.color },
  { icon: Hash, label: "VIN", value: "FCB123792" },
  { icon: Leaf, label: "CO₂ Emissions", value: details?.co2_emission },
  { icon: Users, label: "Previous Owners", value: "01" },
  { icon: Activity, label: "Horsepower (DIN)", value: details?.horsepower_din },
];


const engineSpecs = [
  { label: "Fuel Tank Capacity (Litres)", value: "65 L" },
  { label: "Minimum Kerbweight (kg)", value: "1,650 kg" },
  { label: "Max. Towing Weight - Braked (kg)", value: "800 kg" },
  { label: "Max. Towing Weight - Unbraked (kg)", value: "1,000 kg" },
  { label: "Turning Circle (m)", value: "11.5 m" },
];
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{details?.brand_name}</h1>
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/dashboard/view-analytics/${id}`}
            className="bg-orange-500 text-white px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium"
          >
            View Analytics
          </Link>
          <button className="bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Boost Ads
          </button>
        </div>
      </div>

      {/* Status Icons */}
      <div className="flex gap-3 mb-4">
        <VideoIcon />
        <ProfetionalIcon />
      </div>

      {/* Price */}
      <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        €{details?.discount_price}
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm sm:text-base mb-8 leading-relaxed">
{details?.description}
      </p>

      {/* Specs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
        {/* Left Column */}
        <div className="space-y-4">
          {specs.map((spec, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 text-sm sm:text-base"
            >
              <div className="w-5 h-5 text-gray-600">
                <spec.icon size={20} />
              </div>
              <span className="text-gray-700 font-medium min-w-[110px] sm:min-w-[120px]">
                {spec.label}
              </span>
              <span className="text-gray-900 font-semibold">{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {rightSpecs.map((spec, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 text-sm sm:text-base"
            >
              <div className="w-5 h-5 text-gray-600">
                <spec.icon size={20} />
              </div>
              <span className="text-gray-700 font-medium min-w-[110px] sm:min-w-[120px]">
                {spec.label}
              </span>
              <span className="text-gray-900 font-semibold">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Engine & Transmission Specs Section */}
      <div className="mt-8">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-6">
          Engine & Transmission Specs
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {engineSpecs.map((spec, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-sm sm:text-base"
            >
              <span className="text-gray-700">{spec.label}</span>
              <span className="text-gray-900 font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
