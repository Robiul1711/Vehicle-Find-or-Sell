import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageProvider } from "@/utils/ImageProvider";
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Search,
  Heart,
  Filter,
  X,
} from "lucide-react";
import {
  CustomElement,
  CustomLocation,
  CustomMileage,
  CustomPetrol,
  CustomTime,
  CustomTransmission,
  CustomWeight,
} from "@/utils/IconProvider";
import { Bumpcon, VideoIcon } from "@/components/common/SVGicons/MySvg";
import FilterSection from "./FilterSection";
import { Link } from "react-router-dom";
import NoVehicleFound from "./NoVehicleFound";

// const options = [
//   "Newest",
//   "Featured",
//   "Make (A-Z)",
//   "Make (Z-A)",
//   "Last Update",
// ];

const PartListing = ({
  items,
  onFilterChange,
  filters,
  type,
  isLoading,
  onAddFavorite,
}) => {
  const [isGrid, setIsGrid] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFeatureModal, setIsFeatureModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Feature");
  const [searchText, setSearchText] = useState(filters?.search || "");

  const handleSearch = () => {
    onFilterChange({ search: searchText });
  };

  const handleSelect = (option) => {
    handleSortSelect(option);
  };

  const handleSortSelect = (option) => {
    setSelectedOption(option);
    setIsFeatureModal(false);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        {/* Professional Search Bar */}
        <div className="w-full max-w-2xl relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-custom-primary transition-colors">
            <Search size={20} />
          </div>
          <input
            type="text"
            className="w-full bg-white border border-gray-200 group-focus-within:border-custom-primary group-focus-within:ring-4 group-focus-within:ring-orange-500/10 rounded-xl py-3 pl-12 pr-32 outline-none transition-all shadow-sm text-sm sm:text-base"
            placeholder="Search parts (e.g. engine, tires)..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-custom-primary hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-md shadow-orange-500/20 active:scale-95"
          >
            Search
          </button>
        </div>

        {/* Controls Group */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm"
          >
            <Filter size={18} />
            Filters
          </button>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600 hidden sm:block">
              Sort by:
            </label>
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none cursor-pointer bg-white shadow-sm hover:border-custom-primary transition-colors"
              // Set the value based on the current filters.ordering state
              value={filters?.ordering || ""}
              onChange={(e) => {
                // Directly update the 'ordering' key with the selected value
                onFilterChange({ ordering: e.target.value });
              }}
            >
              <option value="">Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
          {/* View Toggle - Hidden on mobile, force grid */}
          <div className="hidden sm:flex items-center bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setIsGrid(true)}
              className={`p-2 rounded-lg transition-all ${
                isGrid
                  ? "bg-white text-custom-primary shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              }`}
              title="Grid View"
            >
              <IoGrid size={20} />
            </button>
            <button
              onClick={() => setIsGrid(false)}
              className={`p-2 rounded-lg transition-all ${
                !isGrid
                  ? "bg-white text-custom-primary shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              }`}
              title="List View"
            >
              <FaList size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Sort Dropdown */}
      {/* <div className="w-full sm:w-auto">
            <div className="relative">
              <div
                onClick={() => setIsFeatureModal((prev) => !prev)}
                className="flex justify-between items-center px-4 py-2 border border-[#E5E5E5] rounded-lg cursor-pointer whitespace-nowrap"
              >
                <p className="font-light text-sm sm:text-base">
                  Sort by:{" "}
                  <span className="text-[#1B1B1B] font-medium">
                    {selectedOption}
                  </span>
                </p>
                {isFeatureModal ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>

              {isFeatureModal && (
                <div className="absolute left-0 right-0 sm:left-auto sm:right-0 w-full sm:w-48 bg-[#FFFFFF] px-5 py-4 mt-2 rounded-lg shadow-md text-[14px] font-light space-y-3 z-50">
                  {options.map((option, index) => (
                    <div key={index}>
                      <p
                        onClick={() => handleSelect(option)}
                        className={`hover:text-[#1B1B1B] cursor-pointer ${
                          selectedOption === option
                            ? "text-Primary font-medium"
                            : ""
                        }`}
                      >
                        {option}
                      </p>
                      {index !== options.length - 1 && (
                        <hr className="text-[#E5E5E5]" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div> */}

      <div className="flex gap-5">
        <div className="hidden md:block w-1/4 flex-shrink-0">
          <FilterSection onFilterChange={onFilterChange} filters={filters} />
        </div>
        <div className="flex-1 w-full md:w-3/4">
          <div
            className={`${
              isGrid
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4"
                : "grid grid-cols-1 sm:block sm:space-y-6 w-full"
            }`}
          >
            {isLoading ? (
              // Skeleton Loader
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className={`rounded-md bg-white dark:bg-slate-800 shadow-lg overflow-hidden animate-pulse ${
                    isGrid ? "w-full mx-auto" : ""
                  }`}
                >
                  <div
                    className={`${
                      isGrid
                        ? "p-5"
                        : "p-4 flex flex-col lg:flex-row items-center"
                    }`}
                  >
                    <div
                      className={`bg-gray-200 dark:bg-gray-700 rounded-lg ${
                        isGrid
                          ? "w-full h-[200px] mb-5"
                          : "w-44 h-44 mr-4 flex-shrink-0"
                      }`}
                    ></div>
                    <div
                      className={`${isGrid ? "w-full" : "flex-1 space-y-3"}`}
                    >
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      <div className="border-[1px] my-2 border-gray-100 dark:border-gray-700"></div>
                      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                      <div className="border-[1px] my-2 border-gray-100 dark:border-gray-700"></div>
                      <div className="flex justify-between">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : items.length === 0 ? (
              <NoVehicleFound filters={filters} type={type} />
            ) : (
              items.map((item, i) => {
                const waveDelay = isGrid
                  ? (i % 3) * 0.1 + Math.floor(i / 3) * 0.1
                  : i * 0.1;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={false}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [1, 0.5, 1],
                      scale: [1, 0.95, 1],
                      transition: {
                        duration: 0.6,
                        times: [0, 0.5, 1],
                        delay: waveDelay,
                      },
                    }}
                    className={`h-full rounded-md dark:bg-slate-800 bg-white shadow-lg overflow-hidden ${
                      isGrid ? "w-full mx-auto" : ""
                    }`}
                  >
                    <Link 
                      to={`/parts-details/${item.id}/${item.slug}`}
                      layout
                      className={`${
                        isGrid
                          ? "p-5 flex flex-col h-full"
                          : "p-4 flex flex-col sm:flex-row items-start sm:items-center h-full sm:h-auto"
                      }`}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        delay: waveDelay + 0.3,
                      }}
                    >
                      {console.log(item)}
                      <div className="relative">
                        <motion.img
                          layout
                          src={item.image}
                          alt={item.name}
                          className={`rounded-lg object-cover ${
                            isGrid
                              ? "w-full h-[200px] mb-5"
                              : "w-44 h-44 mr-4 flex-shrink-0"
                          }`}
                        />
                        {/* Badge Overlays */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {item.isBumped && (
                            <span className="size-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md" title="Boosted">
                              <Bumpcon className="w-5 h-5" />
                            </span>
                          )}
                          {item.isVideo && (
                            <span className="size-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md" title="Has Video">
                              <VideoIcon className="w-5 h-5" />
                            </span>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddFavorite(item.id);
                          }}
                          className={`absolute ${isGrid ? "top-2 right-2" : "top-2 right-6"} p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all duration-200 z-10 group`}
                        >
                          <Heart
                            className={`w-5 h-5 transition-all duration-300 ${item.isFavorite ? "text-red-500 fill-red-500" : "text-gray-600 group-hover:text-red-500 group-hover:fill-red-500"}`}
                            fill={item.isFavorite ? "currentColor" : "none"}
                          />
                        </button>
                      </div>
                      <div
                        className={`${isGrid ? "w-full flex-1 flex flex-col" : "flex-1"}`}
                      >
                        <motion.h3
                          layout
                          className={`${
                            isGrid
                              ? "lg:text-xl xl:text-2xl font-semibold"
                              : "lg:text-xl xl:text-2xl font-semibold"
                          } text-gray-800 dark:text-[#d2e5f5]`}
                        >
                          {item.name}
                        </motion.h3>
                        <motion.p
                          layout
                          className="text-black mt-1 line-clamp-2"
                        >
                          {item.description}
                        </motion.p>

                        <motion.p
                          layout
                          className="text-black mt-1 flex items-center gap-1 text-sm"
                        >
                          <CustomLocation />
                          {item.location}
                        </motion.p>
                        <motion.div layout className=" my-2 "></motion.div>
                        <motion.div
                          layout
                          className="bg-gray-50 rounded-md p-2 flex justify-between items-center gap-2  "
                        >
                          {item?.mileage && (
                            <div className="flex flex-col items-center">
                              <CustomTime />
                              <p>{item.mileage}</p>
                            </div>
                          )}

                          {item?.fuelType && (
                            <div className="flex flex-col items-center">
                              <CustomWeight />
                              <p>{item.fuelType}</p>
                            </div>
                          )}

                          {item?.transmission && (
                            <div className="flex flex-col items-center">
                              <CustomElement />
                              <p>{item.transmission}</p>
                            </div>
                          )}
                        </motion.div>
                        <motion.div layout className="my-2"></motion.div>
                        <motion.div
                          layout
                          className="flex justify-between mt-auto pt-2"
                        >
                          <motion.p
                            layout
                            className={`${
                              isGrid ? "text-xl" : "text-[1.1rem]"
                            } font-semibold text-gray-900 text-center`}
                          >
                            €{item?.price}
                          </motion.p>
                          <Link to={`/parts-details/${item?.id}/${item?.slug}`}>
                            <motion.p
                              layout
                              className={`${
                                isGrid ? "" : ""
                              } flex items-center gap-1 font-semibold text-gray-900 text-center`}
                            >
                              View Details <ArrowUpRight size={20} />
                            </motion.p>
                          </Link>
                        </motion.div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[85%] max-w-[320px] bg-white z-[60] shadow-2xl md:hidden flex flex-col"
            >
              <div className="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <FilterSection
                  onFilterChange={(params) => {
                    onFilterChange(params);
                    // Optionally close on filter apply if on mobile
                    // setIsSidebarOpen(false);
                  }}
                  filters={filters}
                />
              </div>
              <div className="p-4 border-t bg-gray-50">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-full bg-custom-primary text-white py-3 rounded-xl font-semibold shadow-lg shadow-orange-500/20"
                >
                  Show Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PartListing;
