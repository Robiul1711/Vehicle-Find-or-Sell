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
  // console.log(data)
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
    {/* Documents Section */}
      {data?.documents && data.documents.length > 0 && (
        <div>
           <Title level="title20" className="!font-bold">
            Documents
          </Title>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
            {data.documents.map((doc, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <Title level="title16" className="truncate">
                    {doc.name || `Document ${index + 1}`}
                  </Title>
                  <Title level="title14" className="text-gray-500 line-clamp-1">
                    {doc.document}
                  </Title>
                </div>
                <a
                  href={doc.document}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm whitespace-nowrap"
                >
                  View
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarOverView;
