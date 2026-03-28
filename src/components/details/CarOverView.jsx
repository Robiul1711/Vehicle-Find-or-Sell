import React from "react";
import Title from "../common/Title";
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



const CarOverView = ({details,data}) => {
  const specs = [
  { icon: Car, label: "Body", value: data?.body },
  { icon: Gauge, label: "Mileage", value: data?.mileage },
  { icon: Fuel, label: "Fuel Type", value: data?.fuel_type },
  { icon: Calendar, label: "Year", value: data?.exact_date },
  { icon: Settings, label: "Transmission", value: data?.transmission },
  { icon: Wind, label: "Air Criteria", value: data?.air_criteria },
  { icon: Shield, label: "Warranty", value: data?.warrenty_duration },
  { icon: Zap, label: "Horsepower (CV)", value: data?.horsepower_cv },
  { icon: FileText, label: "Deductible VAT", value: data?.vat_percentage },
];

const rightSpecs = [
  { icon: User, label: "Condition", value: data?.condition },
  { icon: Wrench, label: "Engine Size", value: data?.engine_type },
  { icon: DoorOpen, label: "Door", value: data?.door },
  { icon: Palette, label: "Color", value: data?.color },
  { icon: Hash, label: "VIN", value: data?.registration?.vin_number },
  { icon: Leaf, label: "CO₂ Emissions", value: data?.co2_emission },
  { icon: Users, label: "Previous Owners", value: data?.number_of_owner },
  { icon: Activity, label: "Horsepower (DIN)", value: data?.horsepower_din },
];
  return (
    <div className=" flex flex-col gap-6">
      <Title level="title40" className=" !font-bold capitalize">
        {details} Overview
      </Title>
      <div className=" grid md:grid-cols-2 gap-x-8 gap-y-4">
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
              <span className="text-gray-900 text-sm font-semibold capitalize">
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
              <span className="text-gray-900 text-sm font-semibold capitalize">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarOverView;
