import React, { useState } from "react";
import { Search, ChevronDown, Plus } from "lucide-react";
import DasCarCard from "../Dashboard/DasCarCard";
const cars = [
  {
    id: 1,
    title: "BMW X3 M Sport",
    subtitle: "3.5 D5 PowerPulse Momentum 5dr AW...",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a",
    miles: "47 Miles",
    fuel: "Diesel",
    transmission: "Automatic",
    condition: "New",
    price: "$33,800",
  },
  {
    id: 2,
    title: "Audi A6 Premium",
    subtitle: "2.0 TDI Ultra SE Executive 4dr",
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442",
    miles: "65 Miles",
    fuel: "Petrol",
    transmission: "Manual",
    condition: "Used",
    price: "$29,400",
  },
];
export default function BoostAds() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  return (
    <div className="space-y-6 md:space-y-9">
      <div className="w-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
             Manage & Boost Your Ads
            </h1>
            <p className="text-gray-600">
              Quickly find your listings, check status, and give them a boost.
            </p>
          </div>

        </div>

        {/* Search and Filter Section */}
        <div className="flex gap-4 items-center ">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by Car Name, Model, Year..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-lg bg-white"
            />
            <button className="absolute right-0 top-0 bottom-0 bg-custom-primary text-white px-4 rounded-r-lg transition-colors">
              <Search size={18} />
            </button>
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-10  cursor-pointer"
            >
              <option>All Categories</option>
              <option>Cars</option>
              <option>Motorcycles</option>
              <option>Trucks</option>
              <option>SUVs</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-10  cursor-pointer"
            >
              <option>Boost Status</option>
              <option>Active</option>
              <option>Paused</option>
              <option>Draft</option>
              <option>Expired</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>
          {/* Date Posted Dropdown */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-10  cursor-pointer"
            >
              <option>Date Posted</option>
              <option>Active</option>
              <option>Paused</option>
              <option>Draft</option>
              <option>Expired</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cars.map((car) => (
          <DasCarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
