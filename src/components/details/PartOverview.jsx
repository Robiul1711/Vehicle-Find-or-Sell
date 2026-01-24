import React from "react";
import Title from "../common/Title";

const PartOverview = ({data}) => {
  console.log(data)
  const overviewData = [
    { label: "Vehicle Type", value: data?.vehicle_type },
    { label: "Brand / Manufacturer", value: data?.brand },
    { label: "Part Number / SKU", value: data?.part_number_sku },
    { label: "Main System", value: data?.main_system },
    { label: "Sub-System", value: data?.sub_system },
    { label: "Compatible Make", value: data?.compatible_make },
    { label: "Compatible Model(s)", value: data?.compatible_model },
    { label: "Compatible Year(s)", value: data?.compatible_year },
    { label: "Material", value: data?.material },
    { label: "Length (L)", value: data?.length },
    { label: "Width (W)", value: data?.width },
    { label: "Height (H)", value: data?.height },
    { label: "Weight", value: data?.weight },
    { label: "Position on Vehicle", value: data?.position_on_vehicle },
    { label: "Color", value: data?.color },
    { label: "Warranty", value: data?.warrenty_duration },
    { label: "Quantity in Stock", value: data?.quantity_in_stock },
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
