import { useApiQuery } from "@/hooks/useApiQuery";
import { useFormContext } from "react-hook-form";

export default function BasicDetails({ steps }) {
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
// console.log(data?.data)
  return (
    <div className="">
      <h2 className="text-xl font-medium text-gray-800 mb-6">Basic Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand
          </label>
          <select
            {...register("brand")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm bg-white"
          >
            <option value="">Select Brand</option>
            {data?.data?.map((brand) => (
              <option key={brand.id} value={brand.name}>
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
          <select
            {...register("model")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm bg-white"
          >
                  <option value="">Select Model</option>
            <option value="Corolla">Corolla</option>
            <option value="Civic">Civic</option>
            <option value="R15 V3">R15 V3</option>
            <option value="3 Series">3 Series</option>
            <option value="Mustang">Mustang</option>
          </select>
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
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="SUV">SUV</option>
            <option value="Coupe">Coupe</option>
            <option value="Bike">Bike</option>
            <option value="Scooter">Scooter</option>
          </select>
        </div>

        {watch().category === "Motorcycle" || watch().category === "Scoter" ? (
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
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
            <option value="CNG">CNG</option>
          </select>
        </div>

        {/* Engine Size/Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Engine Size/Type
          </label>
          <input
            {...register("engineSize")}
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
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            <option value="Semi-Automatic">Semi-Automatic</option>
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
            <option value="Brand New">Brand New</option>
            <option value="Used - Like New">Used - Like New</option>
            <option value="Used - Good">Used - Good</option>
            <option value="Used - Fair">Used - Fair</option>
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
            type="text"
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
    </div>
  );
}
