import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function PartsDetails() {
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

  return (
    <div className="">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">
        Parts Details
      </h2>

      {/* Basic Information Section */}
      <div className="mb-8">
        <h3 className="text-base font-medium text-gray-900 mb-4">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Part Name */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Part Name
            </label>
            <input
              {...register("part_name")}
              type="text"
              placeholder="Front Rotating Red Set"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 bg-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Vehicle Type
            </label>
            <select
              {...register("vehicle_type")}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 bg-white focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="truck">Truck</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="scooter">Scooter</option>
              <option value="parts">Parts</option>
            </select>
          </div>

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

          {/* Part Number / SKU */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Part Number / SKU
            </label>
            <input
              {...register("part_number_sku")}
              type="text"
              placeholder="e.g. P-24-0045 or unique identifying code"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 bg-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* System & Compatibility Section */}
      <div className="mb-8">
        <h3 className="text-base font-medium text-gray-900 mb-4">
          System & Compatibility
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Main System */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Main System
            </label>
            <input
              {...register("main_system")}
              type="text"
              placeholder="e.g. Braking System"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Sub-System / Sub-Part */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Sub-System / Sub-Part
            </label>
            <input
              {...register("sub_system")}
              type="text"
              placeholder="e.g. Piston Components"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Compatible Make */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Compatible Make
            </label>
            <input
              {...register("compatible_make")}
              type="text"
              placeholder="e.g. Toyota, Honda, Suzuki (use comma to separate)"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Compatible Model(s) */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Compatible Model(s)
            </label>
            <input
              {...register("compatible_model")}
              type="text"
              placeholder="e.g. Corolla, Civic, Swift (use comma to separate)"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Compatible Year(s) */}
          <div className="md:col-span-2">
            <label className="block text-xs text-gray-600 mb-1.5">
              Compatible Year(s)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                {...register("compatible_year")}
                type="text"
                placeholder="e.g. 2018-2022"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              {/* <input
                {...register("compatibleYearTo")}
                type="text"
                placeholder="e.g. 2018-2022"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications Section */}
      <div className="mb-8">
        <h3 className="text-base font-medium text-gray-900 mb-4">
          Technical Specifications
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Material */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Material
            </label>
            <input
              {...register("material")}
              type="text"
              placeholder="e.g. Ceramic, Steel, Alloy"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">Color</label>
            <input
              {...register("color")}
              type="text"
              placeholder="e.g. Matte Black, Silver"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Dimensions */}
          <div className="md:col-span-2">
            <label className="block text-xs text-gray-600 mb-1.5">
              Dimensions
            </label>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Length
                </label>
                <input
                  {...register("length")}
                  type="text"
                  placeholder="e.g. 15"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Width
                </label>
                <input
                  {...register("width")}
                  type="text"
                  placeholder="e.g. 10"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Height
                </label>
                <input
                  {...register("height")}
                  type="text"
                  placeholder="e.g. 5"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Unit</label>
                <select
                  {...register("unit")}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none  focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="mm">mm</option>
                  <option value="cm">cm</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">Weight</label>
            <input
              {...register("weight")}
              type="text"
              placeholder="e.g. 1.5 kg"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Position on Vehicle */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Position on Vehicle
            </label>
            <input
              {...register("position_on_vehicle")}
              type="text"
              placeholder="e.g. Front Axle, Rear Right, Engine Bay"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Pricing & Inventory Section */}
      <div className="mb-8">
        <h3 className="text-base font-medium text-gray-900 mb-4">
          Pricing & Inventory
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Original Price */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Original Price
            </label>
            <input
              {...register("originalPrice")}
              type="text"
              placeholder="Enter the cost price, e.g. 2600"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Discount Price */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Discount Price
            </label>
            <input
              {...register("discountPrice")}
              type="text"
              placeholder="Enter the retail price, e.g. 3800"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Quantity in Stock */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Quantity in Stock
            </label>
            <input
              {...register("quantity_in_stock")}
              type="text"
              placeholder="e.g. 50"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Warranty */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Warranty
            </label>
            <input
              {...register("warrantyDuration")}
              type="text"
              placeholder="e.g. 1 Year or 20,000 km"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs text-gray-600 mb-1.5">
          Description
        </label>
        <textarea
          {...register("description")}
          rows={4}
          placeholder="Type something about your vehicle"
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 bg-white focus:ring-blue-500 focus:border-blue-500 resize-vertical"
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
