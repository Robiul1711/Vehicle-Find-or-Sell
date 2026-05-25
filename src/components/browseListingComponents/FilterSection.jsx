import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CustomFilter } from "@/utils/IconProvider";
import { useApiQuery } from "@/hooks/useApiQuery";

const FilterSection = ({ onFilterChange, filters }) => {
  // Local state to hold filter values before applying
  const [localFilters, setLocalFilters] = useState({
    price_min: "",
    price_max: "",
    body_type: "",
    brand: "",
    model: "",
    fuel_type: "",
    transmission: "",
    mileage_min: "",
    mileage_max: "",
    year_min: "",
    year_max: "",
    hp_cv_min: "",
    hp_cv_max: "",
    hp_din_min: "",
    hp_din_max: "",
    vat: "",
    country: "",
    condition: "",
    seller_type: "",
  });

  const { data: brands } = useApiQuery({
    queryKey: ["brands"],
    url: "/core/brands/?has_active_ads=true",
    secure: true,
  });
  const { data: fuelTypes } = useApiQuery({
    queryKey: ["fuelTypes"],
    url: "/core/fuel-types/?has_active_ads=true",
    secure: true,
  });

  const { data: transmissionTypes } = useApiQuery({
    queryKey: ["transmissionTypes"],
    url: "/core/transmissions/?has_active_ads=true",
    secure: true,
  });


  const { data: conditions } = useApiQuery({
    queryKey: ["conditions"],
    url: "/core/conditions/?has_active_ads=true",
    secure: true,
  });

  const { data: bodyTypes } = useApiQuery({
    queryKey: ["bodyTypes"],
    url: "/core/body-types/?has_active_ads=true",
    secure: true,
  });

  console.log(bodyTypes)

  const [openSection, setOpenSection] = useState({
    price: true,
    specifications: true,
    others: true,
  });

  const toggleSection = (key) => {
    setOpenSection((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key, value) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    if (onFilterChange) {
      onFilterChange(localFilters);
    }
  };

  const handleClear = () => {
    const resetFilters = {
      price_min: "",
      price_max: "",
      body_type: "",
      brand: "",
      model: "",
      fuel_type: "",
      transmission: "",
      mileage_min: "",
      mileage_max: "",
      year_min: "",
      year_max: "",
      hp_cv_min: "",
      hp_cv_max: "",
      hp_din_min: "",
      hp_din_max: "",
      vat: "",
      country: "",
      condition: "",
      seller_type: "",
    };
    setLocalFilters(resetFilters);
    if (onFilterChange) {
      onFilterChange(resetFilters);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-6">
        <p className="font-semibold text-lg flex items-center gap-2">
          <CustomFilter />
          Filters
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={handleClear}
            className="text-sm text-gray-500 hover:text-black hover:underline transition-all"
          >
            Clear All
          </button>
          <button
            onClick={handleApply}
            className="bg-custom-primary text-white text-sm px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
          >
            Apply Filter
          </button>
        </div>
      </div>

      {/* Price Range */}
      <div className="border-b pb-4">
        <button
          type="button"
          onClick={() => toggleSection("price")}
          className="flex justify-between w-full font-semibold text-black mb-2"
        >
          Price Range
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openSection.price ? "rotate-180" : ""
            }`}
          />
        </button>
        {openSection.price && (
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-xs text-gray-600">Min Price (€)</label>
              <input
                type="number"
                value={localFilters.price_min}
                onChange={(e) => handleChange("price_min", e.target.value)}
                className="w-full border rounded-lg px-2 py-2 text-sm outline-none"
                placeholder="0"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-600">Max Price (€)</label>
              <input
                type="number"
                value={localFilters.price_max}
                onChange={(e) => handleChange("price_max", e.target.value)}
                className="w-full border rounded-lg px-2 py-2 text-sm outline-none"
                placeholder="Max"
              />
            </div>
          </div>
        )}
      </div>

      {/* Specifications */}
      <div className="border-b pb-4">
        <button
          type="button"
          onClick={() => toggleSection("specifications")}
          className="flex justify-between w-full font-semibold text-black mb-2"
        >
          Specifications
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openSection.specifications ? "rotate-180" : ""
            }`}
          />
        </button>
        {openSection.specifications && (
          <div className="space-y-4">
            {/* Body Type */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium">Body Type</label>
              <select
                value={localFilters.body_type}
                onChange={(e) => handleChange("body_type", e.target.value)}
                className="w-full border rounded-lg px-2 py-2 text-sm bg-white outline-none cursor-pointer"
              >
                <option value="">Select Body Type</option>
                {bodyTypes?.data?.map((bodyType) => (
                  <option key={bodyType.id} value={bodyType.name}>
                    {bodyType.name}
                  </option>
                ))}

              </select>
            </div>

            {/* Brand */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium">Brand</label>
              <select
                value={localFilters.brand}
                onChange={(e) => handleChange("brand", e.target.value)}
                className="w-full border rounded-lg px-2 py-2 text-sm bg-white outline-none cursor-pointer"
              >
                <option value="">Select Brand</option>
                {brands?.data?.map((brand) => (
                  <option key={brand.id} value={String(brand.id)}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Model */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium">Model</label>
              <input
                type="text"
                value={localFilters.model}
                onChange={(e) => handleChange("model", e.target.value)}
                className="w-full border rounded-lg px-2 py-2 text-sm outline-none"
                placeholder="Model (e.g. Civic)"
              />
            </div>

            {/* Fuel Type */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium">Fuel Type</label>
              <select
                value={localFilters.fuel_type}
                onChange={(e) => handleChange("fuel_type", e.target.value)}
                className="w-full border rounded-lg px-2 py-2 text-sm bg-white outline-none cursor-pointer"
              >
                <option value="">Select Fuel Type</option>
                {fuelTypes?.data?.map((fuel) => (
                  <option key={fuel.id} value={String(fuel.id)}>
                    {fuel.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Transmission */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium">Transmission</label>
              <select
                value={localFilters.transmission}
                onChange={(e) => handleChange("transmission", e.target.value)}
                className="w-full border rounded-lg px-2 py-2 text-sm bg-white outline-none cursor-pointer"
              >
                <option value="">Select Transmission</option>
                {transmissionTypes?.data?.map((transmission) => (
                  <option key={transmission.id} value={String(transmission.id)}>
                    {transmission.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Mileage Range */}
            <div>
              <label className="text-xs font-medium">Mileage (km)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={localFilters.mileage_min}
                  onChange={(e) => handleChange("mileage_min", e.target.value)}
                  className="w-full border rounded-lg px-2 py-2 text-sm outline-none"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={localFilters.mileage_max}
                  onChange={(e) => handleChange("mileage_max", e.target.value)}
                  className="w-full border rounded-lg px-2 py-2 text-sm outline-none"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Year Range */}
            <div>
              <label className="text-xs font-medium">Year</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={localFilters.year_min}
                  onChange={(e) => handleChange("year_min", e.target.value)}
                  className="w-full border rounded-lg px-2 py-2 text-sm outline-none"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={localFilters.year_max}
                  onChange={(e) => handleChange("year_max", e.target.value)}
                  className="w-full border rounded-lg px-2 py-2 text-sm outline-none"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Horsepower CV */}
            <div>
              <label className="text-xs font-medium">Horsepower (CV)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={localFilters.hp_cv_min}
                  onChange={(e) => handleChange("hp_cv_min", e.target.value)}
                  className="w-full border rounded-lg px-2 py-2 text-sm outline-none"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={localFilters.hp_cv_max}
                  onChange={(e) => handleChange("hp_cv_max", e.target.value)}
                  className="w-full border rounded-lg px-2 py-2 text-sm outline-none"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Horsepower DIN */}
            <div>
              <label className="text-xs font-medium">Horsepower (DIN)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={localFilters.hp_din_min}
                  onChange={(e) => handleChange("hp_din_min", e.target.value)}
                  className="w-full border rounded-lg px-2 py-2 text-sm outline-none"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={localFilters.hp_din_max}
                  onChange={(e) => handleChange("hp_din_max", e.target.value)}
                  className="w-full border rounded-lg px-2 py-2 text-sm outline-none"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* VAT */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium">Deductible VAT</label>
              <select
                value={localFilters.vat}
                onChange={(e) => handleChange("vat", e.target.value)}
                className="w-full border rounded-lg px-2 py-2 text-sm bg-white outline-none cursor-pointer"
              >
                <option value="">Select VAT option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Country */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium">Country</label>
              <input
                type="text"
                value={localFilters.country}
                onChange={(e) => handleChange("country", e.target.value)}
                className="w-full border rounded-lg px-2 py-2 text-sm outline-none"
                placeholder="Country"
              />
            </div>
          </div>
        )}
      </div>

      {/* Others */}
      <div>
        <button
          type="button"
          onClick={() => toggleSection("others")}
          className="flex justify-between w-full font-semibold text-black mb-2"
        >
          Others
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openSection.others ? "rotate-180" : ""
            }`}
          />
        </button>
        {openSection.others && (
          <div className="space-y-4">
            {/* Condition */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium">Vehicle Condition</label>
              <select
                value={localFilters.condition}
                onChange={(e) => handleChange("condition", e.target.value)}
                className="w-full border rounded-lg px-2 py-2 text-sm bg-white outline-none cursor-pointer"
              >
                <option value="">Select Condition</option>
                {conditions?.data?.map((condition) => (
                  <option key={condition.id} value={String(condition.id)}>
                    {condition.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Seller Type */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium">Seller Type</label>
              <select
                value={localFilters.seller_type}
                onChange={(e) => handleChange("seller_type", e.target.value)}
                className="w-full border rounded-lg px-2 py-2 text-sm bg-white outline-none cursor-pointer"
              >
                <option value="">Select Seller Type</option>
                <option value="professional">Professional</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSection;
