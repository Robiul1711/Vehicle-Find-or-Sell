import React from "react";
import { useFormContext } from "react-hook-form";

const SellerAddress = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="">
      <style jsx>{`
        .focus-primary:focus {
          outline: none;
          border-color: #012853;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
      `}</style>

      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Seller Address
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Street Address */}
        <div className="lg:col-span-1">
          <label
            htmlFor="street"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Street
          </label>
          <input
            id="street"
            type="text"
            placeholder="Enter street address"
            {...register("street")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus-primary transition-colors"
          />
        </div>

        {/* ZIP / Postal Code */}
        <div className="lg:col-span-1">
          <label
            htmlFor="zipCode"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            ZIP / Postal Code
          </label>
          <input
            id="zipCode"
            type="text"
            placeholder="Enter Zip Code"
            {...register("zipCode")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus-primary transition-colors"
          />
        </div>

        {/* City */}
        <div className="lg:col-span-1">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            City
          </label>
          <input
            id="city"
            type="text"
            placeholder="Enter your city"
            {...register("city")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus-primary transition-colors"
          />
        </div>

        {/* Country */}
        <div className="lg:col-span-1">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Country
          </label>
          <input
            id="country"
            type="text"
            placeholder="Enter your country"
            {...register("country")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus-primary transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default SellerAddress;
