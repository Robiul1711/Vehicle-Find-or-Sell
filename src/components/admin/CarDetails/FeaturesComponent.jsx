import React from "react";
import { Check } from "lucide-react";

const FeaturesComponent = ({ data }) => {
  // console.log(data?.features_grouped);
  const features = data?.features_grouped || {};

  // Check if features object is empty or all its categories are empty lists
  const hasFeatures = Object.values(features).some(
    (items) => Array.isArray(items) && items.length > 0
  );

  if (!hasFeatures) {
    return null;
  }

  return (
    <div className=" max-w-4xl  py-6 bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Features</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(features).map(([category, items]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2 capitalize">
              {category}
            </h3>
            <div className="space-y-3">
              {items.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center">
                      <Check className="w-3 h-3 text-white stroke-[3]" />
                    </div>
                  </div>
                  <span className="text-gray-700 text-sm capitalize">
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesComponent;
