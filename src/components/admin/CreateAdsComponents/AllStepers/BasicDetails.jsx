import { useState } from "react";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useFormContext } from "react-hook-form";

export default function BasicDetails() {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext();
  const { data, isLoading } = useApiQuery({
    queryKey: ["brands"],
    url: "/core/brands/",
    secure: true,
  });

  const { mutate, isPending } = useApiMutation({
    url: "/core/brands/",
    method: "POST",
    secure: true,
    invalidateKeys: ["brands"],
    onSuccess: () => {
      setIsBrandModalOpen(false);
      setNewBrandName("");
    },
  });

  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");

  const handleCreateBrand = () => {
    if (!newBrandName.trim()) return;
    mutate({ name: newBrandName });
  };

  // console.log(data?.data)
  return (
    <div className="">
      <h2 className="text-xl font-medium text-gray-800 mb-6">Basic Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Brand */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <button
              type="button"
              onClick={() => setIsBrandModalOpen(true)}
              className="text-xs text-custom-primary hover:underline"
            >
              + Add Brand
            </button>
          </div>
          <select
            {...register("brand")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm bg-white"
          >
            <option value="">Select Brand</option>
            {data?.data?.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Model
          </label>
          <input
            {...register("model")}
            type="text"
            placeholder="Type your vehicle model"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm"
          />
        </div>

        {/* Body */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Body
          </label>
          <select
            {...register("body")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm bg-white"
          >
            <option value="">Select Body Type</option>
            <option value="buggy">Buggy</option>
            <option value="convertible">Convertible</option>
            <option value="coupe">Coupe</option>
            <option value="fastback">Fastback</option>
            <option value="flower_car">Flower Car</option>
            <option value="hatchback">Hatchback</option>
            <option value="hearse">Hearse</option>
            <option value="limousine">Limousine</option>
            <option value="microvan">Microvan</option>
            <option value="minivan">Minivan</option>
            <option value="panel_van">Panel Van</option>
            <option value="panel_truck">Panel Truck</option>
            <option value="pickup_truck">Pickup Truck</option>
            <option value="roadster">Roadster</option>
            <option value="sedan">Sedan</option>
            <option value="shooting_brake">Shooting Brake</option>
            <option value="station_wagon">Station Wagon</option>
            <option value="targa_top">Targa Top</option>
            <option value="ute">Ute</option>
          </select>
        </div>
        {watch().vehicle_type === "Motorcycle" ||
        watch().vehicle_type === "Scooter" ? (
          // Seat Height for motorcycles and scoters
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seat Height
            </label>
            <input
              {...register("seatHeight")}
              type="text"
              placeholder="Type your vehicle seat height"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm"
            />
          </div>
        ) : (
          // Door for cars and trucks
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Door
            </label>
            <input
              {...register("door")}
              type="text"
              placeholder="Type your vehicle door"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm"
            />
          </div>
        )}

        {/* Original Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Original Price
          </label>
          <input
            {...register("originalPrice")}
            type="text"
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm"
          />
        </div>

        {/* Discount Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Discount Price
          </label>
          <input
            {...register("discountPrice")}
            type="text"
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm"
          />
        </div>

        {/* Mileage */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mileage
          </label>
          <input
            {...register("mileage")}
            type="text"
            placeholder="2020 KM"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm"
          />
        </div>

        {/* Fuel Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fuel Type
          </label>
          <select
            {...register("fuelType")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm bg-white"
          >
            <option value="">Select Fuel Type</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="hybrid">Hybrid</option>
            <option value="electric">Electric</option>
            <option value="cng">CNG</option>
            <option value="lpg">LPG</option>
            <option value="gasoline">Gasoline</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        {/* Engine Size/Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Engine Size/Type
          </label>
          <input
            {...register("engine_type")}
            type="text"
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm"
          />
        </div>

        {/* Transmission */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transmission
          </label>
          <select
            {...register("transmission")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm bg-white"
          >
            <option value="">Select Transmission Type</option>
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
          </select>
        </div>

        {/* Exact date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exact date
          </label>
          <input
            {...register("exactDate")}
            type="date"
            placeholder="dd/mm/yyyy"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm"
          />
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Condition
          </label>
          <select
            {...register("condition")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm bg-white"
          >
            <option value="">Select Condition</option>
            <option value="new">Brand New</option>
            <option value="used">Used - Like New</option>
          </select>
        </div>

        {/* CO2 Emissions (g/km) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CO₂ Emissions (g/km)
          </label>
          <input
            {...register("co2Emissions")}
            type="text"
            placeholder="e.g. 190 g/km"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm"
          />
        </div>

        {/* Air Criteria / Emission Standard */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Air Criteria / Emission Standard
          </label>
          <input
            {...register("emissionStandard")}
            type="text"
            placeholder="e.g. Euro 6 / Criteria 1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm"
          />
        </div>

        {/* Warranty Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Warranty Duration
          </label>
          <input
            {...register("warrantyDuration")}
            type="text"
            placeholder="e.g. 24 months / 2 years"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm"
          />
        </div>

        {/* Number of Previous Owners */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Previous Owners
          </label>
          <input
            {...register("previousOwners")}
            type="text"
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm"
          />
        </div>

        {/* Horsepower (CV) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Horsepower (CV)
          </label>
          <input
            {...register("horsepowerCV")}
            type="text"
            placeholder="e.g. CV"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm"
          />
        </div>

        {/* Horsepower (DIN) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Horsepower (DIN)
          </label>
          <input
            {...register("horsepowerDIN")}
            type="text"
            placeholder="304 DIN hp"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm"
          />
        </div>

        {/* Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color
          </label>
          <input
            {...register("color")}
            type="text"
            placeholder="Type car color"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm"
          />
        </div>

        {/* Deductible VAT */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deductible VAT
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                {...register("deductibleVAT")}
                type="radio"
                value="yes"
                className="mr-2 text-blue-600"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                {...register("deductibleVAT")}
                type="radio"
                value="no"
                className="mr-2 text-blue-600"
              />
              No
            </label>
          </div>
        </div>

        {/* Deductible Percentage */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deductible Percentage (%)
          </label>
          <input
            {...register("deductiblePercentage")}
            type="number"
            placeholder="Enter the percentage of VAT that is deductible"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm"
          />
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          {...register("description")}
          rows={4}
          placeholder="Type something about your vehicle"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm resize-vertical"
        />
      </div>

      {/* Brand Creation Modal */}
      {isBrandModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Add New Brand</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand Name
              </label>
              <input
                type="text"
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                placeholder="Enter brand name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsBrandModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateBrand}
                disabled={isPending}
                className="px-4 py-2 text-sm text-white bg-custom-primary hover:opacity-90 rounded-md disabled:opacity-50"
              >
                {isPending ? "Adding..." : "Add Brand"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
