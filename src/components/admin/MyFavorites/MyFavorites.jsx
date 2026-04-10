import React, { useState } from "react";
import { Search, ChevronDown, Plus, Heart } from "lucide-react";
import FavouriteCard from "./FavouriteCard";
import { useApiQuery } from "@/hooks/useApiQuery";
import DasCarCardSkeleton from "../Dashboard/DasCarCardSkeleton";
import PaginationComponent from "@/components/common/PaginationComponent";

export default function MyFavorites() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All Categories");
  const [condition, setCondition] = useState("Condition");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, refetch } = useApiQuery({
    queryKey: ["my-favorites", search, type, condition, currentPage],
    url: "/account/favorites",
    secure: true,
    params: {
      page: currentPage,
      search: search || undefined,
      type:
        type !== "All Categories"
          ? type.toLowerCase().replace("s", "")
          : undefined,
      condition:
        condition !== "Condition" ? condition.toLowerCase() : undefined,
    },
  });
  // console.log(data?.results);
  return (
    <div className="space-y-6 md:space-y-9 ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Ads Overview
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage all your ads in one place. Edit, pause, or create new ads
            easily.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center mb-6">
        {/* Search Input */}
        <div className="relative flex-1 w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search by Car Name, Model, Year..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-lg bg-white text-sm sm:text-base"
          />
          <button className="absolute right-0 top-0 bottom-0 bg-custom-primary text-white px-4 rounded-r-lg transition-colors">
            <Search size={18} />
          </button>
        </div>

        {/* Category Dropdown */}
        <div className="relative w-full sm:w-auto">
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setCurrentPage(1);
            }}
            className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-10 w-full sm:w-auto cursor-pointer text-sm sm:text-base"
          >
            <option>All Categories</option>
            <option>Vehicle</option>
            <option>Parts</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            size={16}
          />
        </div>

        {/* Status Dropdown */}
        <div className="relative w-full sm:w-auto">
          <select
            value={condition}
            onChange={(e) => {
              setCondition(e.target.value);
              setCurrentPage(1);
            }}
            className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-10 w-full sm:w-auto cursor-pointer text-sm sm:text-base"
          >
            <option>Condition</option>
            <option>New</option>
            <option>Used</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            size={16}
          />
        </div>
      </div>

      {/* Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(8)].map((_, index) => (
            <DasCarCardSkeleton key={index} />
          ))}
        </div>
      ) : data?.results?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-lg border border-gray-100 mt-6">
          <div className="bg-gray-50 p-4 rounded-full mb-4">
            <Heart className="w-12 h-12 text-gray-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No favorites added yet
          </h3>
          <p className="text-gray-500 text-center max-w-sm">
            When you find a car you like, click the heart icon to save it here for later.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-4 sm:gap-6">
            {data?.results?.map((car) => (
              <FavouriteCard key={car.id} car={car} />
            ))}
          </div>
          {data?.count > 0 && (
            <div className="mt-8 flex justify-center w-full">
              <PaginationComponent
                pageCount={Math.ceil(data.count / 4)}
                setPageCount={setCurrentPage}
                forcePage={currentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
