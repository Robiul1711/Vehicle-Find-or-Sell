import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import VechleBoostCard from "./VechleBoostCard";

const cars = [
  {
    id: 1,
    title: "BMW X3 M Sport",
    subtitle: "3.5 D5 PowerPulse Momentum 5dr AW...",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a",
    miles: "47 Kilometer",
    fuel: "Diesel",
    transmission: "Automatic",
    condition: "New",
    price: "€33,800",
  },
  {
    id: 2,
    title: "Audi A6 Premium",
    subtitle: "2.0 TDI Ultra SE Executive 4dr",
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442",
    miles: "65 Kilometer",
    fuel: "Petrol",
    transmission: "Manual",
    condition: "Used",
    price: "€29,400",
  },
];

export default function BoostAds() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("Boost Status");
  const [selectedDate, setSelectedDate] = useState("Date Posted");

  return (
    <div className="space-y-6 md:space-y-9">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Manage & Boost Your Ads
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Quickly find your listings, check status, and give them a boost.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center mb-6">
        {/* Search */}
        <div className="relative flex-1 w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search by Car Name, Model, Year..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-lg bg-white text-sm sm:text-base"
          />
          <button className="absolute right-0 top-0 bottom-0 bg-custom-primary text-white px-4 rounded-r-lg transition-colors">
            <Search size={18} />
          </button>
        </div>

        {/* Category */}
        <div className="relative w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-10 w-full sm:w-auto cursor-pointer text-sm sm:text-base"
          >
            <option>All Categories</option>
            <option>Cars</option>
            <option>Motorcycles</option>
            <option>Trucks</option>
            <option>SUVs</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>

        {/* Boost Status */}
        <div className="relative w-full sm:w-auto">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-10 w-full sm:w-auto cursor-pointer text-sm sm:text-base"
          >
            <option>Boost Status</option>
            <option>Active</option>
            <option>Paused</option>
            <option>Draft</option>
            <option>Expired</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>

        {/* Date Posted */}
        <div className="relative w-full sm:w-auto">
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-10 w-full sm:w-auto cursor-pointer text-sm sm:text-base"
          >
            <option>Date Posted</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-4 sm:gap-6">
        {cars.map((car) => (
          <VechleBoostCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
