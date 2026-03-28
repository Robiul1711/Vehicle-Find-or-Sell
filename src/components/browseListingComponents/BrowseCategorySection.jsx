import {
  CustomBike,
  CustomCar,
  CustomPart,
  CustomScoter,
  CustomTruck,
} from "@/utils/IconProvider";
import React, { useState } from "react";
import CarListing from "./CarListing";
import {
  bikeData,
  carData,
  partData,
  scooterData,
  truckData,
} from "@/utils/data";
import PartListing from "./PartListing";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useApiMutation } from "@/hooks/useApiMutation";
import PaginationComponent from "@/components/common/PaginationComponent";

const BrowseCategorySection = () => {
  const [activeTab, setActiveTab] = useState("car");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterParams, setFilterParams] = useState({
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
    search: "",
  });

  const { data, isLoading, refetch } = useApiQuery({
    queryKey: ["store-filter", activeTab, filterParams, currentPage],
    url: "/store/filter/",
    params: {
      type: activeTab,
      page: currentPage,
      ...Object.fromEntries(
        Object.entries(filterParams).filter(
          ([_, v]) => v !== "" && v !== null && v !== undefined,
        ),
      ),
    },
    secure: true,
  });

  console.log(data);
  const handleFilterChange = (newParams) => {
    setFilterParams((prev) => ({ ...prev, ...newParams }));
    setCurrentPage(1);
  };

  const mapCarData = (results) => {
    if (!results) return [];
    return results.map((item) => ({
      id: item.id,
      name: `${item.brand_name || ""} ${item.model || ""}`,
      description: item.body || item.model,
      location: item.seller_address,
      mileage: item.mileage,
      fuelType: item.fuel_type,
      transmission: item.transmission,
      image: item.first_image, // Handle null/default image in component
      price: item.discount_price || item.original_price,
      isFavorite: item.is_favorite,
    }));
  };

  const mapPartData = (results) => {
    if (!results) return [];
    return results.map((item) => ({
      id: item.id,
      name: item.part_name,
      description: item.description,
      location: item.seller_address,
      mileage: item.warrenty_duration, // Reusing mileage slot for warranty or other info if needed, or create new prop
      fuelType: item.weight ? `${item.weight} ${item.unit || ""}` : "", // Reusing fuelType for weight
      transmission: item.color, // Reusing transmission for color
      image: item.first_image,
      price: item.discount_price || item.original_price,
      isFavorite: item.is_favorite,
    }));
  };

  const { mutate } = useApiMutation({
    url: "/account/favorites/toggle/",
    method: "POST",
    secure: true,
    successMessage: "Toggle favorite success!",
    onSuccess: () => {
      refetch();
    },
  });

  const onAddFavorite = (id, type) => {
    mutate({ id, type });
  };

  // Define categories data
  const categories = [
    {
      id: "car",
      label: "Car",
      icon: <CustomCar />,
      content: (
        <CarListing
          items={mapCarData(data?.results)}
          onFilterChange={handleFilterChange}
          filters={filterParams}
          isLoading={isLoading}
          onAddFavorite={(id) => onAddFavorite(id, "vehicle")}
        />
      ),
    },
    {
      id: "truck",
      label: "Utility Trucks",
      icon: <CustomTruck />,
      content: (
        <CarListing
          items={mapCarData(data?.results)}
          onFilterChange={handleFilterChange}
          filters={filterParams}
          isLoading={isLoading}
          onAddFavorite={(id) => onAddFavorite(id, "vehicle")}
        />
      ),
    },
    {
      id: "motorcycle",
      label: "Motorcycle",
      icon: <CustomBike />,
      content: (
        <CarListing
          items={mapCarData(data?.results)}
          onFilterChange={handleFilterChange}
          filters={filterParams}
          isLoading={isLoading}
          onAddFavorite={(id) => onAddFavorite(id, "vehicle")}
        />
      ),
    },
    {
      id: "scooter",
      label: "Scooter",
      icon: <CustomScoter />,
      content: (
        <CarListing
          items={mapCarData(data?.results)}
          onFilterChange={handleFilterChange}
          filters={filterParams}
          isLoading={isLoading}
          onAddFavorite={(id) => onAddFavorite(id, "vehicle")}
        />
      ),
    },
    {
      id: "parts",
      label: "Parts",
      icon: <CustomPart />,
      content: (
        <PartListing
          items={mapPartData(data?.results)}
          onFilterChange={handleFilterChange}
          filters={filterParams}
          isLoading={isLoading}
          onAddFavorite={(id) => onAddFavorite(id, "parts")}
        />
      ),
    },
  ];

  // Get active category content
  const getActiveContent = () => {
    const activeCategory = categories.find((cat) => cat.id === activeTab);
    return activeCategory ? activeCategory.content : "";
  };

  return (
    <div className="">
      {/* Header */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">
        Browse Categories
      </h2>

      {/* Custom Tab Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-4 mb-8 pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setActiveTab(category.id);
              setCurrentPage(1);
            }}
            className={`flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 transition-all duration-200 flex-shrink-0 ${
              activeTab === category.id
                ? "border-orange-400 bg-orange-50 shadow-md"
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
            }`}
          >
            <span
              className={`text-2xl ${
                activeTab === category.id ? "text-[#F88E08]" : "text-gray-700"
              } `}
            >
              {category.icon}
            </span>
            <span
              className={` lg:text-2xl font-medium text-center ${
                activeTab === category.id ? "text-orange-700" : "text-gray-700"
              }`}
            >
              {category.label}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 min-h-[300px]">
        <div className="leading-relaxed">{getActiveContent()}</div>

        {data?.count > 4 && (
          <div className="mt-8 flex justify-center">
            <PaginationComponent
              pageCount={Math.ceil(data.count / 4)}
              setPageCount={setCurrentPage}
              forcePage={currentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseCategorySection;
