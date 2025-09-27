import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox"; // shadcn Checkbox

export const SelectFeatures = () => {
  const { control, watch } = useFormContext();

  const featureSections = [
    {
      title: "Exterior Features",
      features: [
        "2-wheel drive",
        "2 sunroofs",
        "4-wheel steering",
        "3 sunroofs",
        "4-wheel drive",
        "Fog Lamps",
        "Roof Rails",
        "Automatic differential lock",
        "Coupling",
        "Front tow parking assistance",
        "Rear differential lock",
        "Differential lock",
        "Spoiler",
        "Body-coloured wheel cover",
        "Stainless steel wheel cover",
      ],
    },
    {
      title: "Interior Features",
      features: [
        "Leather Seats",
        "Touchscreen Display",
        "Air Conditioning / Climate Control",
        "Power Windows",
        "Steering Wheel Controls",
        "Adjustable Seats",
        "CD player/head unit",
        "Folding bench seat",
        "6-speed gearbox",
        "Refrigerated glove box",
        "Automatic transmission",
        "Separated gearbox",
        "Built-in compass",
        "Rear center armrest",
        "Front center armrest",
      ],
    },
    {
      title: "Security",
      features: [
        "2 airbags",
        "3 rear 3-point seat belts",
        "3rd brake light",
        "4 airbags",
        "6 airbags",
        "8 airbags",
        "ABS",
        "Head-up display",
        "Hill start assist",
        "Front airbag",
        "Rearview Camera",
        "Blind Spot Monitoring",
        "Lane Assist",
      ],
    },
    {
      title: "Comfort & Convenience",
      features: [
        "Keyless entry system",
        "Bluetooth",
        "Virtual cockpit",
        "Cruise Control",
        "Keyless Entry / Push Start",
        "Voice Control",
        "Heated Seats",
      ],
    },
  ];

  return (
    <div className="md:p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Select Features
      </h1>

      {featureSections.map((section, sectionIndex) => (
        <div key={section.title} className="mb-8">
          <h2 className="text-lg font-medium text-gray-700 mb-4">
            {section.title}
          </h2>

          <div className="grid grid-cols-3 gap-x-8 gap-y-3">
            {section.features.map((feature, featureIndex) => {
              const fieldName = `${section.title
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "_")}_${featureIndex}`;

              return (
                <Controller
                  key={fieldName}
                  name={fieldName}
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        {...field}
                        checked={field.value || false}
                        onCheckedChange={(val) => field.onChange(val)}
                        className="border-black data-[state=checked]:bg-black data-[state=checked]:border-black"
                      />
                      <span className="text-sm text-gray-700 select-none">
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
