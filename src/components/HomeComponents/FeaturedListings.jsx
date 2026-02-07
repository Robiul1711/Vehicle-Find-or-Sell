import React, { useState } from "react";
import { Loader } from "lucide-react";

import Title from "../common/Title";
import Tabs from "../common/Tabs";

import { bikes, cars, Parts, Scoter, trucks } from "@/lib/cardata";
import VehiclesCardDemo from "../common/VehiclesCardDemo";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useApiMutation } from "@/hooks/useApiMutation";

const FeaturedListings = () => {
  const [activeTab, setActiveTab] = useState("car");
  const { data, isLoading, refetch } = useApiQuery({
    queryKey: ["store-filter", activeTab],
    url: "/store/filter/",
    params: {
      type: activeTab,
    },
    secure: true,
  });

  // add favorite
  const { mutate, isPending } = useApiMutation({
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

  const getMappedData = () => {
    if (!data?.results) return [];

    if (activeTab === "parts") {
      return data.results.map((item) => ({
        id: item.id,
        imageUrl: item.first_image,
        title: item.part_name,
        subtitle: item.brand_name,
        mileage: item.warrenty_duration,
        fuelType: item.weight,
        transmission: item.material,
        price: item.discount_price,
        isNew: false,
        isFavorite: item.is_favorite,
      }));
    } else {
      return data.results.map((item) => ({
        id: item.id,
        imageUrl: item.first_image,
        title: `${item.brand_name} ${item.model}`,
        subtitle: item.seller_address,
        mileage: item.mileage,
        fuelType: item.fuel_type,
        transmission: item.transmission,
        price: item.discount_price,
        isNew: false,
        isFavorite: item.is_favorite,
      }));
    }
  };

  const currentData = getMappedData();

  /* Helper to render content based on state */
  const renderTabContent = (type = "vehicle") => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-20">
          <Loader className="animate-spin text-blue-600" size={32} />
        </div>
      );
    }

    if (!currentData || currentData.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            No {type === "part" ? "parts" : "vehicles"} available
          </h3>
          <p className="text-gray-500 mt-1">
            Check back later for new listings.
          </p>
        </div>
      );
    }

    return (
      <VehiclesCardDemo
        cars={currentData}
        path={type === "part" ? "parts-details" : undefined}
        onAddFavorite={onAddFavorite}
        type={type}
      />
    );
  };

  const tabData = [
    {
      id: "car",
      name: "Cars",
      content: renderTabContent("vehicle"),
    },
    {
      id: "motorcycle",
      name: "Motorcycle",
      content: renderTabContent("vehicle"),
    },
    {
      id: "truck",
      name: "Utility Trucks",
      content: renderTabContent("vehicle"),
    },
    {
      id: "scooter",
      name: "Scooter",
      content: renderTabContent("vehicle"),
    },
    {
      id: "parts",
      name: "Parts",
      content: renderTabContent("part"),
    },
  ];

  return (
    <div className="section-padding-x section-padding-y bg-[#F9FAFB]">
      <Title level="title40">Featured Listings</Title>
      <Title level="title18" className="mt-4">
        Showcasing the latest and most popular ads on the platform.
      </Title>
      <div className="mt-5 md:mt-10">
        <Tabs items={tabData} activeTab={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  );
};

export default FeaturedListings;
