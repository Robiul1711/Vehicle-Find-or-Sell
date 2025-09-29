import React from "react";

const EngineSpec = () => {
  const engineSpecs = [
    { label: "Fuel Tank Capacity (Litres)", value: "65 L" },
    { label: "Minimum Kerbweight (kg)", value: "1,650 kg" },
    { label: "Max. Towing Weight - Braked (kg)", value: "800 kg" },
    { label: "Max. Towing Weight - Unbraked (kg)", value: "1,000 kg" },
    { label: "Turning Circle (m)", value: "11.5 m" },
  ];
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Engine & Transmission Specs
      </h3>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {engineSpecs.map((spec, index) => (
          <div key={index} className="flex flex-col gap-3">
            <span className="text-gray-700 text-sm">{spec.label}</span>
            <span className="text-gray-900 text-sm font-medium">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EngineSpec;
