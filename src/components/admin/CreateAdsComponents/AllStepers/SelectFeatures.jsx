import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { useApiQuery } from "@/hooks/useApiQuery";

export const SelectFeatures = () => {
  const { control } = useFormContext();

  const { data, isLoading } = useApiQuery({
    queryKey: ["features"],
    url: "/ads/features/",
    secure: true,
  });

  // The API returns { features_grouped: { ... } }
  // So we access data.features_grouped if it exists, otherwise fallback to data (just in case)
  const featuresData = data?.features_grouped || data;

  if (isLoading) return <div>Loading features...</div>;
  if (!featuresData) return <div>No features found.</div>;

  // We convert the API object keys into an array to map over them
  const categories = Object.keys(featuresData);

  return (
    <div className="overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Select Features
      </h1>

      {categories.map((category) => (
        <div key={category} className="mb-8">
          {/* Capitalize the category name for the title */}
          <h2 className="text-lg font-medium text-gray-700 mb-4 capitalize">
            {category}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {featuresData[category].map((feature) => {
              // Using a consistent naming convention for form state
              // e.g., features.1, features.5, etc.
              const fieldName = `features.${feature.id}`;

              return (
                <Controller
                  key={feature.id}
                  name={fieldName}
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center space-x-2 cursor-pointer group">
                      <Checkbox
                        id={fieldName}
                        checked={field.value || false}
                        onCheckedChange={(val) => field.onChange(val)}
                        className="border-gray-400 data-[state=checked]:bg-black data-[state=checked]:border-black"
                      />
                      <span className="text-sm text-gray-700 select-none group-hover:text-black capitalize">
                        {feature.name}
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
