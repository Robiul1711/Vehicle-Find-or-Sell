import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox"; // shadcn Checkbox

export const BikeFeatures = () => {
  const { control } = useFormContext();

  const featureSections = [
    {
      title: "Dimensions & Capacity",
      features: [
        "Overall Length",
        "Overall Width",
        "Overall Height",
        "Wheelbase",
        "Ground Clearance",
        "Seat Height",
        "Fuel Tank Capacity",
        "Reserve Fuel Capacity",
        "Oil Tank Capacity",
        "Ground Clearance",
      ],
    },
    {
      title: "Electricals",
      features: [
        "Battery Type",
        "Battery Capacity",
        "Headlight",
        "Tail Light",
        "Turn Signal Lamp",
        "DRL",
        "Instrument Console",
        "Speedometer",
        "Tachometer",
        "Mobile Charging Port",
        "Trip Meter",
        "Odometer",
        "Fuel Gauge",
        "Gear Indicator",
        "Bluetooth Connectivity",
        "Navigation",
      ],
    },
    {
      title: "Security",
      features: [
        "ABS",
        "CBS",
        "Immobilizer",
        "Engine Kill Switch",
        "Side-Stand Engine Cut-off",
        "Riding Modes",
        "Traction Control",
      ],
    },
    {
      title: "Comfort & Convenience",
      features: [
        "Electric Start",
        "Kick Start",
        "Cruise Control",
        "Adjustable Handlebar",
        "Adjustable Rear Suspension",
        "Seat Type",
        "Pillion Seat",
        "Pillion Grabrail",
        "Pillion Footrest",
        "Luggage Hook",
      ],
    },
  ];

  return (
    <div className="max-w-6xl">
      <h1 className="text-xl font-semibold text-gray-900 mb-8">
        Select Features
      </h1>

      {featureSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-7">
          <h2 className="text-base font-normal text-gray-900 mb-4">
            {section.title}
          </h2>

          <div className="grid grid-cols-5 gap-x-8 gap-y-3.5">
            {section.features.map((feature, featureIndex) => {
              const fieldName = `${section.title
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "_")}_${featureIndex}`;

              return (
                <Controller
                  key={fieldName}
                  name={fieldName}
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <label className="flex items-center space-x-2.5 cursor-pointer">
                      <Checkbox
                        checked={field.value || false}
                        onCheckedChange={(val) => field.onChange(val)}
                        className="border-gray-400 data-[state=checked]:bg-black data-[state=checked]:border-black rounded-sm h-4 w-4"
                      />
                      <span className="text-sm text-gray-900 select-none leading-tight">
                        {feature}
                      </span>
                    </label>
                  )}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};