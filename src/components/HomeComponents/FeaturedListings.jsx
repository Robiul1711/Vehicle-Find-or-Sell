import React, { useState } from "react";

import Title from "../common/Title";
import Tabs from "../common/Tabs";

import { bikes, cars, Parts, Scoter, trucks } from "@/lib/cardata";
import VehiclesCardDemo from "../common/VehiclesCardDemo";
import { useApiQuery } from "@/hooks/useApiQuery";

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
      }));
    }
  };

  const currentData = getMappedData();

  const tabData = [
    {
      id: "car",
      name: "Cars",
      content: <VehiclesCardDemo cars={currentData} />,
    },
    {
      id: "motorcycle",
      name: "Motorcycle",
      content: <VehiclesCardDemo cars={currentData} />,
    },
    {
      id: "truck",
      name: "Utility Trucks",
      content: <VehiclesCardDemo cars={currentData} />,
    },
    {
      id: "scooter",
      name: "Scooter",
      content: <VehiclesCardDemo cars={currentData} />,
    },
    {
      id: "parts",
      name: "Parts",
      content: <VehiclesCardDemo cars={currentData} path="parts-details" />,
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
