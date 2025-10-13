import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FaAngleLeft } from "react-icons/fa6";
import {
  CustomBike,
  CustomCar,
  CustomPart,
  CustomScoter,
  CustomTruck,
} from "@/utils/IconProvider";

export default function SelectCategory({ onCategorySelect }) {
  const { control, watch, reset } = useFormContext();

  const categories = [
    { id: "car", label: "Car", icon: CustomCar },
    { id: "UtilityTrucks", label: "Utility Trucks", icon: CustomTruck },
    { id: "Motorcycle", label: "Motorcycle", icon: CustomBike },
    { id: "Scoter", label: "Scooter", icon: CustomScoter },
    { id: "Parts", label: "Parts", icon: CustomPart },
  ];

  const selectedCategory = watch("category") || null;

  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Post Your Ad
        </h1>
        <p className="text-gray-600">
          List your car, utility trucks, motorcycle, scooter or spare parts in
          just a few clicks and reach thousands of buyers instantly.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Select Category
        </h2>

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categories.map((category) => {
                const IconComponent = category.icon;
                const isSelected = field.value === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      field.onChange(category.id);
                      onCategorySelect?.(category.id);
                      reset({ category: category.id }); // ✅ Keep selected category
                    }}
                    className={`
    relative flex flex-col items-center justify-center 
    p-6 rounded-lg border-2 transition-all duration-200 
    ${
      isSelected
        ? "border-orange-500 bg-orange-50 shadow-md"
        : "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50"
    }
  `}
                  >
                    <div
                      className={`
      mb-3 p-3 rounded-full 
      ${
        isSelected
          ? "bg-[#F88E08]/10 text-orange-700"
          : "bg-gray-100 text-gray-600"
      }
    `}
                    >
                      <IconComponent size={24} className="bg-[#F88E08]" />
                    </div>
                    <span
                      className={`
      text-sm font-medium
      ${isSelected ? "text-orange-800" : "text-gray-700"}
    `}
                    >
                      {category.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        />
      </div>
    </div>
  );
}
