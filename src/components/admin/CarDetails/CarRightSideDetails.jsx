import React from 'react';
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
  Activity
} from 'lucide-react';
import { ProfetionalIcon, VideoIcon } from "@/components/common/SVGicons/MySvg";
import { Link, useParams } from 'react-router-dom';
const specs = [
    { icon: Car, label: "Body", value: "Sedan" },
    { icon: Gauge, label: "Mileage", value: "250 km" },
    { icon: Fuel, label: "Fuel Type", value: "Petrol" },
    { icon: Calendar, label: "Year", value: "2021" },
    { icon: Settings, label: "Transmission", value: "Manual" },
    { icon: Wind, label: "Air Criteria", value: "Crit Air 2" },
    { icon: Shield, label: "Warranty", value: "12 Months" },
    { icon: Zap, label: "Horsepower (CV)", value: "500 CV" },
    { icon: FileText, label: "Deductible VAT", value: "50%" }
  ];

  const rightSpecs = [
    { icon: User, label: "Condition", value: "Used" },
    { icon: Wrench, label: "Engine Size", value: "4.0" },
    { icon: DoorOpen, label: "Door", value: "4 Doors" },
    { icon: Palette, label: "Color", value: "Black" },
    { icon: Hash, label: "VIN", value: "FCB123792" },
    { icon: Leaf, label: "CO₂ Emissions", value: "120 g/km" },
    { icon: Users, label: "Previous Owners", value: "01" },
    { icon: Activity, label: "Horsepower (DIN)", value: "368 DIN hp" }
  ];

  const engineSpecs = [
    { label: "Fuel Tank Capacity (Litres)", value: "65 L" },
    { label: "Minimum Kerbweight (kg)", value: "1,650 kg" },
    { label: "Max. Towing Weight - Braked (kg)", value: "800 kg" },
    { label: "Max. Towing Weight - Unbraked (kg)", value: "1,000 kg" },
    { label: "Turning Circle (m)", value: "11.5 m" }
  ];
  export default function CarRightSideDetails() {
  const { id } = useParams();
  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">BMW 95</h1>
        <div className="flex gap-2">
         <Link to={`/dashboard/view-analytics/${id}`} className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium">
            View Analytics
          </Link>
          <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Boost Ads
          </button>
        </div>
      </div>

      {/* Status Icons */}
      <div className="flex gap-2 mb-4">
        <VideoIcon />
        <ProfetionalIcon />
      </div>

      {/* Price */}
      <div className="text-3xl font-bold text-gray-900 mb-6">$10,000</div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-8 leading-relaxed">
        Well-maintained BMW 330d M Sport 2021 with only 25,000 km on the
        odometer. Single-owner vehicle, full service history available. Features
        include panoramic sunroof, leather interior, advanced safety systems,
        and Apple CarPlay/Android Auto. Smooth automatic transmission and
        powerful diesel engine for excellent performance. Ideal for city and
        highway driving. Available for immediate inspection.
      </p>

  <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
        {/* Left Column */}
        <div className="space-y-4">
          {specs.map((spec, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-5 h-5 text-gray-600">
                <spec.icon size={20} />
              </div>
              <span className="text-gray-700 text-sm font-medium min-w-[120px]">
                {spec.label}
              </span>
              <span className="text-gray-900 text-sm font-semibold">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {rightSpecs.map((spec, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-5 h-5 text-gray-600">
                <spec.icon size={20} />
              </div>
              <span className="text-gray-700 text-sm font-medium min-w-[120px]">
                {spec.label}
              </span>
              <span className="text-gray-900 text-sm font-semibold">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Engine & Transmission Specs Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Engine & Transmission Specs
        </h3>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          {engineSpecs.map((spec, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-700 text-sm">
                {spec.label}
              </span>
              <span className="text-gray-900 text-sm font-medium">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
