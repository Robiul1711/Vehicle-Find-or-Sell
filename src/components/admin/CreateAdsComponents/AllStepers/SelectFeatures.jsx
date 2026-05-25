import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { useApiQuery } from "@/hooks/useApiQuery";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const SelectFeatures = () => {
  const { control, watch, setValue } = useFormContext();
  const [newFeatureInputs, setNewFeatureInputs] = useState({});

  const customFeatures = watch("custom_features") || {};

  const handleAddCustomFeature = (category) => {
    const name = newFeatureInputs[category]?.trim();
    if (!name) return;

    const currentCategoryCustom = customFeatures[category] || [];
    if (currentCategoryCustom.includes(name)) {
      setNewFeatureInputs((prev) => ({ ...prev, [category]: "" }));
      return;
    }

    setValue(`custom_features.${category}`, [...currentCategoryCustom, name]);
    setNewFeatureInputs((prev) => ({ ...prev, [category]: "" }));
  };

  const handleRemoveCustomFeature = (category, index) => {
    const currentCategoryCustom = customFeatures[category] || [];
    const updated = currentCategoryCustom.filter((_, i) => i !== index);
    setValue(`custom_features.${category}`, updated);
  };

  const { data, isLoading } = useApiQuery({
    queryKey: ["features"],
    url: "/ads/features/",
    secure: true,
  });
// console.log(watch("vehicle_type"), "selected vehicle type in features step");
  // The API returns { features_grouped: { ... } }
  // So we access data.features_grouped if it exists, otherwise fallback to data (just in case)
  const featuresData = data?.features_grouped || data;

  const selectedVehicleType = (watch("vehicle_type") || "").toString().trim().toLowerCase();
  const isVehicleTypeSelected = Boolean(selectedVehicleType && selectedVehicleType !== "all");

  if (isLoading) return <div>Loading features...</div>;
  if (!featuresData) return <div>No features found.</div>;

  // We convert the API object keys into an array to map over them
  const categories = Object.keys(featuresData);

  const filteredGroups = categories
    .map((category) => {
      const features = featuresData[category] || [];
      const filteredFeatures = isVehicleTypeSelected
        ? features.filter((feature) =>
            (feature.vehicle_type || "").toString().trim().toLowerCase() === selectedVehicleType
          )
        : features;

      return { category, features: filteredFeatures };
    })
    .filter((group) => group.features.length > 0);

  if (isVehicleTypeSelected && filteredGroups.length === 0) {
    return <div>No features available for selected vehicle type.</div>;
  }

  return (
    <div className="overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Select Features
      </h1>

      {filteredGroups.map(({ category, features }) => (
        <div key={category} className="mb-8">
          {/* Capitalize the category name for the title */}
          <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-medium text-gray-700 capitalize">
            {category}
          </h2>
       <div className="flex items-center space-x-2 group/input">
              <Input
                placeholder="Add other..."
                value={newFeatureInputs[category] || ""}
                onChange={(e) =>
                  setNewFeatureInputs((prev) => ({
                    ...prev,
                    [category]: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCustomFeature(category);
                  }
                }}
                className="h-7 w-30 text-sm border-gray-200 focus:border-black focus:ring-0 rounded-md transition-all placeholder:text-gray-400"
              />
              <Button
                type="button"
                onClick={() => handleAddCustomFeature(category)}
                variant="outline"
                className={cn(
                  "h-7 transition-all shrink-0  flex items-center justify-center rounded-md text-[10px] font-bold uppercase tracking-wider",
                  newFeatureInputs[category]?.trim()
                    ? "bg-black text-white border-black px-3 w-auto"
                    : "w-7 p-0 border-gray-200 hover:border-black hover:bg-black hover:text-white"
                )}
              >
                {newFeatureInputs[category]?.trim() ? (
                  "Add New"
                ) : (
                  <Plus size={14} />
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {features.map((feature) => {
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

            {/* Custom Features */}
            {(customFeatures[category] || []).map((name, index) => (
              <div key={index} className="flex items-center space-x-2 group">
                <div className="relative flex items-center">
                  <Checkbox
                    checked={true}
                    onCheckedChange={() => handleRemoveCustomFeature(category, index)}
                    className="border-black bg-black data-[state=checked]:bg-black data-[state=checked]:border-black"
                  />
                </div>
                <span className="text-sm text-gray-700 select-none capitalize">
                  {name}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveCustomFeature(category, index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}

            {/* Add Custom Feature Input */}
     
          </div>
        </div>
      ))}
    </div>
  );
};
