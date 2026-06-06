import React, { useState, useCallback, useEffect } from "react";
import { Search, ChevronDown, Plus, SearchX } from "lucide-react";
import DasCarCard from "../Dashboard/DasCarCard";
import { Link } from "react-router-dom";
import { useApiQuery } from "@/hooks/useApiQuery";
import DasCarCardSkeleton from "../Dashboard/DasCarCardSkeleton";
import { useDebounce } from "@/hooks/useDebounce";
import PaginationComponent from "../../common/PaginationComponent";

export default function AdsOverview() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search input so we don't fire on every keystroke
  const debouncedSearch = useDebounce(searchInput, 400);

  // Determine which endpoint and params to use
  const isSearching = debouncedSearch.trim().length > 0;

  const searchParams = {
    page: currentPage,
    ...(selectedCategory && { vehicle_type: selectedCategory }),
    ...(isSearching && { q: debouncedSearch }),
    ...(selectedStatus &&
      (["is_favourite", "is_pause", "is_boost"].includes(selectedStatus)
        ? { [selectedStatus]: true }
        : { status: selectedStatus })),
  };

  const { data, isLoading, isFetching } = useApiQuery({
    queryKey: isSearching
      ? [
          "search-ads",
          debouncedSearch,
          selectedCategory,
          selectedStatus,
          currentPage,
        ]
      : ["my-ads", selectedCategory, selectedStatus, currentPage],
    url: isSearching ? "/ads/search/" : "/ads/my-ads/",
    params: searchParams,
    secure: true,
  });

  const { data: statsData } = useApiQuery({
    queryKey: ["dashboardStats"],
    url: "/ads/dashboard/stats/",
    secure: true,
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedCategory, selectedStatus]);

  const showSkeleton = isLoading || isFetching;

  const hasNoAdsAtAll =
    !showSkeleton &&
    (statsData?.data?.total_listings === 0 ||
      ((!data?.data || data?.data?.length === 0) &&
        !isSearching &&
        !selectedCategory &&
        !selectedStatus));

  const hasNoResults =
    !showSkeleton &&
    !hasNoAdsAtAll &&
    (Array.isArray(data) ? data.length === 0 : data?.data?.length === 0);

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
      {!hasNoAdsAtAll && (
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
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-10 w-full sm:w-[200px] cursor-pointer text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-custom-primary focus:border-transparent transition shadow-sm hover:border-gray-300"
            >
              <option value="">
                All Status ({statsData?.data?.total_listings || 0})
              </option>
              <option value="active">
                Active ({statsData?.data?.active_listings || 0})
              </option>
              <option value="pending">
                Pending ({statsData?.data?.pending_ads || 0})
              </option>
              <option value="scheduled">
                Scheduled ({statsData?.data?.scheduled_ads || 0})
              </option>
              <option value="is_favourite">
                Favourite ({statsData?.data?.favourites_saved || 0})
              </option>
              <option value="is_pause">
                Paused Ads ({statsData?.data?.paused_ads || 0})
              </option>
              <option value="is_boost">
                Boosted Ads ({statsData?.data?.boosted_ads || 0})
              </option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>
        </div>
      )}

      {/* Active filter indicators */}
      {!hasNoAdsAtAll && (debouncedSearch || selectedCategory || selectedStatus) && (
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
              {selectedStatus.replace(/is_|_/g, " ")}
            </span>
          )}
          <button
            onClick={() => {
              setSearchInput("");
              setSelectedCategory("");
              setSelectedStatus("");
              setCurrentPage(1);
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
      ) : hasNoAdsAtAll ? (
        /* New User / No Ads State */
        <div className="flex flex-col items-center justify-center py-10 px-4 text-center bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-100 shadow-sm">
          <div className="bg-blue-50/80 rounded-full p-6 mb-6 ring-8 ring-blue-50/30 animate-pulse">
            <Plus size={48} className="text-custom-primary" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
            No Ads Posted Yet
          </h3>
          <p className="text-gray-500 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
            You haven't posted any listings yet. Start selling your vehicle today by posting your very first ad!
          </p>
          <Link
            to="/dashboard/create-ads"
            className="inline-flex items-center gap-2 bg-custom-primary hover:bg-blue-800 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg text-sm sm:text-base font-semibold"
          >
            <Plus size={18} />
            Post Your First Ad
          </Link>
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
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {data?.data?.map((car) => (
              <DasCarCard key={car.id} car={car} />
            ))}
          </div>

          {data?.count > 8 && (
            <div className="flex justify-center mt-8 pb-10">
              <PaginationComponent
                pageCount={Math.ceil((data?.count || 0) / 8)}
                setPageCount={setCurrentPage}
                forcePage={currentPage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
