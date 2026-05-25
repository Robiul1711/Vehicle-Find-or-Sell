import React from "react";
import Title from "../common/Title";
import { FileText } from "lucide-react";

const PartOverview = ({ data }) => {
  console.log(data);
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
    <div className="flex flex-col gap-6">
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
      {data?.registration?.document && <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
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
      </div>}
   
    </div>
  );
};

export default PartOverview;
