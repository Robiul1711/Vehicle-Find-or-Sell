import React, { useState, useCallback } from "react";
import { Search, ChevronDown, Plus, SearchX } from "lucide-react";
import DasCarCard from "../Dashboard/DasCarCard";
import { Link } from "react-router-dom";
import { useApiQuery } from "@/hooks/useApiQuery";
import DasCarCardSkeleton from "../Dashboard/DasCarCardSkeleton";
import { useDebounce } from "@/hooks/useDebounce";

export default function AdsOverview() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Debounce search input so we don't fire on every keystroke
  const debouncedSearch = useDebounce(searchInput, 400);

  // Determine which endpoint and params to use
  const isSearching = debouncedSearch.trim().length > 0;

  const searchParams = isSearching
    ? {
        q: debouncedSearch,
        ...(selectedCategory && { vehicle_type: selectedCategory }),
        ...(selectedStatus && { status: selectedStatus }),
      }
    : {
        ...(selectedCategory && { vehicle_type: selectedCategory }),
        ...(selectedStatus && { status: selectedStatus }),
      };

  const { data, isLoading, isFetching } = useApiQuery({
    queryKey: isSearching ? ["search-ads"] : ["my-ads"],
    url: isSearching ? "/ads/search/" : "/ads/my-ads/",
    params: searchParams,
    secure: true,
  });

  const showSkeleton = isLoading || isFetching;
  const hasNoResults =
    !showSkeleton && Array.isArray(data) && data.length === 0;

  const handleClearSearch = useCallback(() => {
    setSearchInput("");
  }, []);

  return (
    <div className="space-y-6 md:space-y-9">
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
        <Link
          to="/dashboard/create-ads"
          className="bg-custom-primary hover:bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm sm:text-base"
        >
          <Plus size={16} />
          Post New Ad
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* Search */}
        <div className="relative flex-1 w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search by Car Name, Model, Year..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-lg bg-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-custom-primary focus:border-transparent transition"
          />
          {searchInput ? (
            <button
              onClick={handleClearSearch}
              className="absolute right-0 top-0 bottom-0 bg-gray-400 hover:bg-gray-500 text-white px-4 rounded-r-lg transition-colors"
              title="Clear search"
            >
              ✕
            </button>
          ) : (
            <button className="absolute right-0 top-0 bottom-0 bg-custom-primary text-white px-4 rounded-r-lg transition-colors">
              <Search size={18} />
            </button>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="relative w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-10 w-full sm:w-auto cursor-pointer text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-custom-primary focus:border-transparent transition"
          >
            <option value="">All Categories</option>
            <option value="car">Cars</option>
            <option value="motorcycle">Motorcycles</option>
            <option value="scooter">Scooters</option>
            <option value="truck">Trucks</option>
            <option value="parts">Parts</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            size={16}
          />
        </div>

        {/* Status Dropdown */}
        <div className="relative w-full sm:w-auto">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-10 w-full sm:w-auto cursor-pointer text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-custom-primary focus:border-transparent transition"
          >
            <option value="" >
              All Status
            </option>
            <option value="active" >
              Active
            </option>
            <option value="paused" >
              Paused
            </option>
            <option value="draft" >
              Draft
            </option>
            <option value="expired" >
              Expired
            </option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            size={16}
          />
        </div>
      </div>

      {/* Active filter indicators */}
      {(debouncedSearch || selectedCategory || selectedStatus) && (
        <div className="flex items-center gap-2 flex-wrap text-sm text-gray-500">
          <span className="font-medium">Active filters:</span>
          {debouncedSearch && (
            <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full flex items-center gap-1">
              Search: &quot;{debouncedSearch}&quot;
            </span>
          )}
          {selectedCategory && (
            <span className="bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1 rounded-full capitalize">
              {selectedCategory}
            </span>
          )}
          {selectedStatus && (
            <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full capitalize">
              {selectedStatus}
            </span>
          )}
          <button
            onClick={() => {
              setSearchInput("");
              setSelectedCategory("");
              setSelectedStatus("");
            }}
            className="text-red-500 hover:text-red-700 underline ml-1 transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Cars Grid */}
      {showSkeleton ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <DasCarCardSkeleton key={i} />
          ))}
        </div>
      ) : hasNoResults ? (
        /* No Results State */
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="bg-gray-100 rounded-full p-6 mb-5">
            <SearchX size={48} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No results found
          </h3>
          <p className="text-gray-500 text-sm max-w-sm mb-6">
            {isSearching
              ? `We couldn't find any ads matching "${debouncedSearch}". Try adjusting your search or filters.`
              : "No ads found for the selected filters. Try changing your category or status."}
          </p>
          <button
            onClick={() => {
              setSearchInput("");
              setSelectedCategory("");
              setSelectedStatus("");
            }}
            className="bg-custom-primary hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg transition-colors text-sm font-medium"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {data?.data?.map((car) => (
            <DasCarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
