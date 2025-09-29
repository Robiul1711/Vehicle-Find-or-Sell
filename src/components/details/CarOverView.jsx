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

const specs = [
  { icon: Car, label: "Body", value: "Sedan" },
  { icon: Gauge, label: "Mileage", value: "250 km" },
  { icon: Fuel, label: "Fuel Type", value: "Petrol" },
  { icon: Calendar, label: "Year", value: "2021" },
  { icon: Settings, label: "Transmission", value: "Manual" },
  { icon: Wind, label: "Air Criteria", value: "Crit Air 2" },
  { icon: Shield, label: "Warranty", value: "12 Months" },
  { icon: Zap, label: "Horsepower (CV)", value: "500 CV" },
  { icon: FileText, label: "Deductible VAT", value: "50%" },
];

const rightSpecs = [
  { icon: User, label: "Condition", value: "Used" },
  { icon: Wrench, label: "Engine Size", value: "4.0" },
  { icon: DoorOpen, label: "Door", value: "4 Doors" },
  { icon: Palette, label: "Color", value: "Black" },
  { icon: Hash, label: "VIN", value: "FCB123792" },
  { icon: Leaf, label: "CO₂ Emissions", value: "120 g/km" },
  { icon: Users, label: "Previous Owners", value: "01" },
  { icon: Activity, label: "Horsepower (DIN)", value: "368 DIN hp" },
];

const CarOverView = ({details}) => {
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
    </div>
  );
};

export default CarOverView;
