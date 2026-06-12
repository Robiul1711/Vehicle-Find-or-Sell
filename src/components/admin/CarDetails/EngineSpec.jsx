import React from "react";

const EngineSpec = ({data}) => {
  const engineSpecs = [
    { label: "Fuel Tank Capacity (Litres)", value: data?.engine_transmission?.fuelTankCapacity },
    { label: "Minimum Kerbweight (kg)", value: data?.engine_transmission?.minimumKerWeight },
    { label: "Max. Towing Weight - Braked (kg)", value: data?.engine_transmission?.maxTowingWeightBraked },
    { label: "Max. Towing Weight - Unbraked (kg)", value: data?.engine_transmission?.maxTowingWeightUnbraked },
    { label: "Turning Circle (m)", value: data?.engine_transmission?.turningCircle },
  ];
  return (
    <>
    {
      data?.engine_transmission && (
        
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Engine & Transmission Specs
      </h3>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {engineSpecs.filter(spec => spec.value).map((spec, index) => (
          <div key={index} className="flex flex-col gap-3">
            <span className="text-gray-700 text-sm">{spec.label}</span>
            <span className="text-gray-900 text-sm font-medium">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
      )
    }
    </>
  );
};

export default EngineSpec;
