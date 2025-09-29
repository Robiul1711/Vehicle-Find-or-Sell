import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox"; // shadcn Checkbox

export const UtilityTrucksFeatures = () => {
  const { control } = useFormContext();

  const featureSections = [
    {
      title: "Exterior Feature",
      features: [
        "Halogen / LED Headlamps",
        "Fog Lights",
        "Alloy Wheels / Steel Rims",
        "Side Step & Roof Rails",
        "Cargo Bed with Tie-Down Hooks",
      ],
    },
    {
      title: "Interior Features",
      features: [
        "Fabric or Leather Seats",
        "Adjustable Steering Wheel",
        "Air Conditioning with Rear Vents",
        "Ample Storage Compartments",
        "Steering Wheel Controls",
      ],
    },
    {
      title: "Security",
      features: [
        "Central Locking System",
        "Anti-lock Braking System (ABS)",
        "Engine Immobilizer",
        "Rear Parking Sensors / Camera",
        "Airbags (Driver & Passenger)",
      ],
    },
    {
      title: "Comfort & Convenience",
      features: [
        "Power Steering",
        "Bluetooth",
        "Power Windows",
        "Cruise Control",
        "Keyless Entry / Push Start",
        "Cup Holders & Armrest",
      ],
    },
  ];

  return (
    <div className="max-w-6xl">
      <h1 className="text-xl font-semibold text-gray-900 mb-8">
        Select Features
      </h1>

      {featureSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          <h2 className="text-base font-normal text-gray-900 mb-4">
            {section.title}
          </h2>

          <div className="grid grid-cols-5 gap-x-6 gap-y-4">
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
                        className="border-gray-400 data-[state=checked]:bg-black data-[state=checked]:border-black rounded-sm"
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