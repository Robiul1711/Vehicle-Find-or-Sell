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

const CarOverView = ({ details, data }) => {
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
      <div>
        <Title level="title40" className=" !font-bold">
          Description
        </Title>
        <div
          className="
          mt-4
    text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed 
    prose prose-slate dark:prose-invert max-w-none
    
    prose-p:leading-relaxed prose-strong:text-slate-900 dark:prose-strong:text-white
    prose-ul:list-disc prose-li:marker:text-blue-400
  "
          dangerouslySetInnerHTML={{ __html: data?.description || "" }}
        />
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
        <Title level="title40" className="!font-bold mb-4">
          Documents
        </Title>

        <div className="flex flex-col gap-3">
          <a
            href={data?.registration?.document}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl 
      hover:bg-slate-50 dark:hover:bg-slate-800 
      transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-lg bg-blue-50 dark:bg-slate-800 
        group-hover:scale-105 transition"
              >
                <FileText className="w-4 h-4 text-blue-500" />
              </div>

              <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                {data?.registration?.document
                  ? "Registration Certificate"
                  : "Document"}
              </span>
            </div>

            <span className="text-xs text-slate-400 group-hover:text-blue-500 transition">
              View
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarOverView;
