import React from "react";

import Title from "../common/Title";
import Tabs from "../common/Tabs";

import { bikes, cars, Parts, Scoter, trucks } from "@/lib/cardata";
import VehiclesCardDemo from "../common/VehiclesCardDemo";

const tabData = [
  {
    id: 1,
    name: "Cars",
    content: <VehiclesCardDemo cars={cars} />,
  },
  {
    id: 2,
    name: "Motorcycle",
    content: <VehiclesCardDemo cars={bikes} />,
  },
  {
    id: 3,
    name: "Utility Trucks",
    content: <VehiclesCardDemo cars={trucks} />,
  },
  {
    id: 4,
    name: "Scoter",
    content: <VehiclesCardDemo cars={Scoter} />,
  },
  {
    id: 5,
    name: "Parts",
    content: <VehiclesCardDemo cars={Parts} />,
  },
];
const FeaturedListings = () => {
  return (
    <div className="section-padding-x section-padding-y bg-[#F9FAFB]">
      <Title level="title40">Featured Listings</Title>
      <Title level="title18" className="mt-4">
        Showcasing the latest and most popular ads on the platform.
      </Title>
      <div className="mt-10">
        <Tabs items={tabData} />
      </div>
    </div>
  );
};

export default FeaturedListings;
