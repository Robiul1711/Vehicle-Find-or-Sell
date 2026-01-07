import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CustomFilter } from "@/utils/IconProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    url: "/core/brands/",
    secure: true,
  });

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
            <div>
              <label className="text-xs text-gray-600">Min Price (€)</label>
              <input
                type="number"
                value={localFilters.price_min}
                onChange={(e) => handleChange("price_min", e.target.value)}
                className="w-full border rounded-lg px-2 py-2 text-sm"
                placeholder="0"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">Max Price (€)</label>
              <input
                type="number"
                value={localFilters.price_max}
                onChange={(e) => handleChange("price_max", e.target.value)}
                className="w-full border rounded-lg px-2 py-2 text-sm"
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
              <Select
                value={localFilters.body_type}
                onValueChange={(val) => handleChange("body_type", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Body Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buggy">Buggy</SelectItem>
                  <SelectItem value="convertible">Convertible</SelectItem>
                  <SelectItem value="coupe">Coupe</SelectItem>
                  <SelectItem value="fastback">Fastback</SelectItem>
                  <SelectItem value="flower_car">Flower Car</SelectItem>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                  <SelectItem value="hearse">Hearse</SelectItem>
                  <SelectItem value="limousine">Limousine</SelectItem>
                  <SelectItem value="microvan">Microvan</SelectItem>
                  <SelectItem value="minivan">Minivan</SelectItem>
                  <SelectItem value="panel_van">Panel Van</SelectItem>
                  <SelectItem value="panel_truck">Panel Truck</SelectItem>
                  <SelectItem value="pickup_truck">Pickup Truck</SelectItem>
                  <SelectItem value="roadster">Roadster</SelectItem>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="shooting_brake">Shooting Brake</SelectItem>
                  <SelectItem value="station_wagon">Station Wagon</SelectItem>
                  <SelectItem value="targa_top">Targa Top</SelectItem>
                  <SelectItem value="ute">Ute</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Brand */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium">Brand</label>
              <Select
                value={localFilters.brand}
                onValueChange={(val) => handleChange("brand", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands?.data?.map((brand) => (
                    <SelectItem key={brand.id} value={String(brand.id)}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Model */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium">Model</label>
              <input
                type="text"
                value={localFilters.model}
                onChange={(e) => handleChange("model", e.target.value)}
                className="w-full border rounded-lg px-2 py-2 text-sm"
                placeholder="Model (e.g. Civic)"
              />
            </div>

            {/* Fuel Type */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium">Fuel Type</label>
              <Select
                value={localFilters.fuel_type}
                onValueChange={(val) => handleChange("fuel_type", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Fuel Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="petrol">Petrol</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="hydrogen">Hydrogen</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Transmission */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium">Transmission</label>
              <Select
                value={localFilters.transmission}
                onValueChange={(val) => handleChange("transmission", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Transmission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="automatic">Automatic</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mileage Range */}
            <div>
              <label className="text-xs font-medium">Mileage (km)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={localFilters.mileage_min}
                  onChange={(e) => handleChange("mileage_min", e.target.value)}
                  className="w-full border rounded-lg px-2 py-2 text-sm"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={localFilters.mileage_max}
                  onChange={(e) => handleChange("mileage_max", e.target.value)}
                  className="w-full border rounded-lg px-2 py-2 text-sm"
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
                  className="w-full border rounded-lg px-2 py-2 text-sm"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={localFilters.year_max}
                  onChange={(e) => handleChange("year_max", e.target.value)}
                  className="w-full border rounded-lg px-2 py-2 text-sm"
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
                  className="w-full border rounded-lg px-2 py-2 text-sm"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={localFilters.hp_cv_max}
                  onChange={(e) => handleChange("hp_cv_max", e.target.value)}
                  className="w-full border rounded-lg px-2 py-2 text-sm"
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
                  className="w-full border rounded-lg px-2 py-2 text-sm"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={localFilters.hp_din_max}
                  onChange={(e) => handleChange("hp_din_max", e.target.value)}
                  className="w-full border rounded-lg px-2 py-2 text-sm"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* VAT */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium">Deductible VAT</label>
              <Select
                value={localFilters.vat}
                onValueChange={(val) => handleChange("vat", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select VAT option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Country */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium">Country</label>
              <input
                type="text"
                value={localFilters.country}
                onChange={(e) => handleChange("country", e.target.value)}
                className="w-full border rounded-lg px-2 py-2 text-sm"
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
              <Select
                value={localFilters.condition}
                onValueChange={(val) => handleChange("condition", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Seller Type */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium">Seller Type</label>
              <Select
                value={localFilters.seller_type}
                onValueChange={(val) => handleChange("seller_type", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Seller Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSection;
