import React from "react";
import Title from "../common/Title";

const PartOverview = () => {
  const overviewData = [
    { label: "Honda Type", value: "Car" },
    { label: "Brand / Manufacturer", value: "Used" },
    { label: "Part Number / SKU", value: "P-24-09Hb" },
    { label: "Main System", value: "Braking System" },
    { label: "Sub-System", value: "Friction Components" },
    { label: "Compatible Make", value: "Toyota" },
    { label: "Compatible Model(s)", value: "Corolla, Axio" },
    { label: "Compatible Year(s)", value: "2018 - 2022" },
    { label: "Material", value: "Ceramic" },
    { label: "Length (L)", value: "132 mm" },
    { label: "Width (W)", value: "55 mm" },
    { label: "Height (H)", value: "16 mm" },
    { label: "Weight", value: "1.5 kg" },
    { label: "Position on Vehicle", value: "Front Axle" },
    { label: "Color", value: "Matte Black" },
    { label: "Warranty", value: "6 Year" },
    { label: "Quantity in Stock", value: "20" },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 bg-white">
      <Title level="title40" className=" !font-bold">
        Parts Overview
      </Title>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
        {overviewData.map((item, index) => (
          <div key={index} className="flex items-center  gap-5">
            <span className="text-sm text-gray-600 font-normal">
              {item.label}
            </span>
            <span className="text-base text-gray-900 font-normal">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartOverview;
