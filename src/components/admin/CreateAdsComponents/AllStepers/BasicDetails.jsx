import { useState, useEffect } from "react";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "align",
  "link",
];

export default function BasicDetails() {
  const {
    watch,
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const vehicleType = watch("vehicle_type");
  const selectedBrand = watch("brand");
  const currentModel = watch("model");
  const currentVersion = watch("version");
  const trimVersions = watch("trim_versions");
  const currentBody = watch("body");
  const currentFuelType = watch("fuelType");
  const currentTransmission = watch("transmission");
  const currentCondition = watch("condition");

  const { data: fuelTypes } = useApiQuery({
    queryKey: ["fuel-types"],
    url: "core/fuel-types/",
  });

  const { data: transmissions } = useApiQuery({
    queryKey: ["transmissions"],
    url: "core/transmissions/",
  });

  const { data: conditions } = useApiQuery({
    queryKey: ["conditions"],
    url: "core/conditions/",
  });

  const { data: bodyTypesData } = useApiQuery({
    queryKey: ["body-types", vehicleType],
    url: "core/body-types/",
    params: { vehicle_type: vehicleType?.toLowerCase() },
    enabled: !!vehicleType,
  });

  const { data: brandsData } = useApiQuery({
    queryKey: ["brands", vehicleType],
    url: "core/brands/",
    params: { vehicle_type: vehicleType?.toLowerCase() },
    enabled: !!vehicleType,
  });

  const { data: modelsData } = useApiQuery({
    queryKey: ["models", selectedBrand, vehicleType],
    url: "core/models/",
    params: {
      brand_id: selectedBrand,
      vehicle_type: vehicleType?.toLowerCase(),
    },
    enabled: !!selectedBrand && !!vehicleType,
  });

  const { data: versionsData } = useApiQuery({
    queryKey: ["versions", selectedBrand, currentModel, vehicleType],
    url: "core/versions/",
    params: {
      brand_id: selectedBrand,
      model_name: currentModel,
      vehicle_type: vehicleType?.toLowerCase(),
    },
    enabled: !!selectedBrand && !!currentModel && !!vehicleType,
  });

  const brands = brandsData?.data || [];
  const models = modelsData?.data || [];
  const versions = versionsData?.data || [];
  const bodyTypes = bodyTypesData?.data || bodyTypesData || [];
  const fuelTypesList = fuelTypes?.data || fuelTypes || [];
  const transmissionsList = transmissions?.data || transmissions || [];
  const conditionsList = conditions?.data || conditions || [];

  return (
    <div className="">
      <h2 className="text-xl font-medium text-gray-800 mb-6">Basic Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand <span className="text-gray-500 text-xs"></span>
          </label>
          <select
            {...register("brand", {
              onChange: (e) => {
                setValue("model", "");
                setValue("version", "");
                setValue("trim_versions", []);
              },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm"
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option value={brand?.id} key={brand?.id}>
                {brand?.name}
              </option>
            ))}
            {selectedBrand && !brands.some((b) => b?.id == selectedBrand) && (
              <option value={selectedBrand}>{selectedBrand}</option>
            )}
          </select>
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Model <span className="text-red-500 text-xs ">(Required)</span>
          </label>
          <select
            {...register("model", {
              onChange: (e) => {
                setValue("version", "");
                setValue("trim_versions", []);
              },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm"
            disabled={!selectedBrand}
          >
            <option value="">Select Model</option>
            {models.map((model) => (
              <option value={model?.name} key={model?.id}>
                {model?.name}
              </option>
            ))}
            {currentModel && !models.some((m) => m?.name == currentModel) && (
              <option value={currentModel}>{currentModel}</option>
            )}
          </select>
        </div>

        {/* Version */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Version
          </label>
          {trimVersions && trimVersions.length > 0 ? (
            <select
              {...register("version")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm"
            >
              <option value="">Select Version</option>
              {trimVersions.map((tv, idx) => (
                <option value={tv.version} key={idx}>
                  {tv.version}
                </option>
              ))}
              {currentVersion &&
                !trimVersions.some((tv) => tv.version === currentVersion) && (
                  <option value={currentVersion}>{currentVersion}</option>
                )}
            </select>
          ) : (
            <>
              <input
                {...register("version")}
                list="version-list"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm"
                placeholder="Select or type version"
                disabled={!currentModel}
              />
              <datalist id="version-list">
                {versions.map((v) => (
                  <option value={v?.name || v?.version} key={v?.id} />
                ))}
              </datalist>
            </>
          )}
        </div>

        {/* Body */}
        {vehicleType !== "Motorcycle" && vehicleType !== "Scooter" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Body
            </label>
            <select
              {...register("body")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm"
            >
              <option value="">Select Body Type</option>
              {bodyTypes?.map((body) => (
                <option value={body?.name} key={body?.id}>
                  {body?.name}
                </option>
              ))}
              {currentBody &&
                !bodyTypes?.some((b) => b?.name == currentBody) && (
                  <option value={currentBody}>{currentBody}</option>
                )}
            </select>
          </div>
        )}
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
            Original Price{" "}
            <span className="text-red-500 text-xs">(Required)</span>
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
            {fuelTypesList?.map((fuel) => (
              <option value={fuel?.name} key={fuel?.id}>
                {fuel?.name}
              </option>
            ))}
            {currentFuelType &&
              !fuelTypesList?.some((f) => f?.name == currentFuelType) && (
                <option value={currentFuelType}>{currentFuelType}</option>
              )}
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
            {transmissionsList?.map((transmission) => (
              <option value={transmission?.name} key={transmission?.id}>
                {transmission?.name}
              </option>
            ))}
            {currentTransmission &&
              !transmissionsList?.some(
                (t) => t?.name == currentTransmission,
              ) && (
                <option value={currentTransmission}>
                  {currentTransmission}
                </option>
              )}
          </select>
        </div>

        {/* Exact date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exact date <span className="text-red-500 text-xs">(Required)</span>
          </label>
          <Controller
            name="exactDate"
            control={control}
            render={({ field }) => {
              // Safely parse whatever the API returns into a valid Date or null
              const parseDate = (val) => {
                if (!val) return null;
                if (val instanceof Date)
                  return isNaN(val.getTime()) ? null : val;
                const str = String(val).trim();
                // Year only: "2020" → Jan 1 of that year
                if (/^\d{4}$/.test(str)) {
                  const d = new Date(`${str}-01-01`);
                  return isNaN(d.getTime()) ? null : d;
                }
                // MM/YYYY or M/YYYY
                if (/^\d{1,2}\/\d{4}$/.test(str)) {
                  const [m, y] = str.split("/");
                  const d = new Date(`${y}-${m.padStart(2, "0")}-01`);
                  return isNaN(d.getTime()) ? null : d;
                }
                // DD/MM/YYYY
                if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(str)) {
                  const [dd, mm, yyyy] = str.split("/");
                  const d = new Date(
                    `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`,
                  );
                  return isNaN(d.getTime()) ? null : d;
                }
                // Fallback: try native parse (ISO strings etc.)
                const d = new Date(str);
                return isNaN(d.getTime()) ? null : d;
              };

              return (
                <DatePicker
                  placeholderText="DD/MM/YYYY"
                  dateFormat="dd/MM/yyyy"
                  selected={parseDate(field.value)}
                  onChange={(date) => field.onChange(date)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-custom-primary focus:border-custom-primary text-sm"
                />
              );
            }}
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
            {conditionsList?.map((condition) => (
              <option value={condition?.name} key={condition?.id}>
                {condition?.name}
              </option>
            ))}
            {currentCondition &&
              !conditionsList?.some((c) => c?.name == currentCondition) && (
                <option value={currentCondition}>{currentCondition}</option>
              )}
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
            Color <span className="text-red-500 text-xs">(Required)</span>
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
        <div className="quill-editor-wrapper notranslate" translate="no">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <ReactQuill
                theme="snow"
                value={field.value || ""}
                onChange={field.onChange}
                modules={modules}
                formats={formats}
                placeholder="Type something about your vehicle..."
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
