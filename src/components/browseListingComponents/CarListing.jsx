import { useState } from "react";
import { motion } from "framer-motion";
import { ImageProvider } from "@/utils/ImageProvider";
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Search,
  Heart,
} from "lucide-react";
import {
  CustomLocation,
  CustomMileage,
  CustomPetrol,
  CustomTransmission,
} from "@/utils/IconProvider";
import FilterSection from "./FilterSection";
import { Link } from "react-router-dom";

// const options = [
//   "Newest",
//   "Featured",
//   "Make (A-Z)",
//   "Make (Z-A)",
//   "Last Update",
// ];

const CarListing = ({
  items,
  onFilterChange,
  filters,
  isLoading,
  onAddFavorite,
}) => {
  const [isGrid, setIsGrid] = useState(false);
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
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-5 mb-10">
        {/* Search Bar - Full width on mobile, flexible on desktop */}
        <div className="w-full lg:w-auto lg:flex-1 border rounded-xl flex items-center gap-3 px-4">
          <Search />
          <input
            type="text"
            className="w-full p-2 outline-none bg-transparent"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* Button Group - Stack on mobile, row on desktop */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center">
          {/* Search Button - Full width on mobile, auto on larger screens */}
          <button
            onClick={handleSearch}
            className="w-full sm:w-auto bg-custom-primary text-white px-4 py-2 rounded-lg whitespace-nowrap"
          >
            Search
          </button>

          {/* View Toggle Buttons */}
          <div className="flex space-x-2 bg-gray-200 p-1.5 rounded-lg">
            <button
              onClick={() => setIsGrid(true)}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-md font-medium transition-colors ${
                isGrid
                  ? "bg-custom-primary text-white shadow-sm"
                  : "text-black hover:bg-gray-300"
              }`}
            >
              <IoGrid />
            </button>
            <button
              onClick={() => setIsGrid(false)}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-md font-medium transition-colors ${
                !isGrid
                  ? "bg-custom-primary text-white shadow-sm"
                  : "text-black hover:bg-gray-300"
              }`}
            >
              <FaList />
            </button>
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
        </div>
      </div>

      <div className="flex gap-5">
        <div className="hidden md:block w-1/4 flex-shrink-0">
          <FilterSection onFilterChange={onFilterChange} filters={filters} />
        </div>
        <div className="flex-1 w-full md:w-3/4">
          <div
            key={isLoading ? "loading" : "items"}
            className={`${
              isGrid
                ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4"
                : "space-y-6  md:w-[75%]"
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
              <div className="col-span-full text-center py-20 text-gray-500">
                No Vehicle Found
              </div>
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
                    className={`rounded-md dark:bg-slate-800 bg-white shadow-lg overflow-hidden ${
                      isGrid ? "w-full mx-auto" : ""
                    }`}
                  >
                    <motion.div
                      layout
                      className={`${
                        isGrid
                          ? "p-5"
                          : "p-4 flex flex-col lg:flex-row items-center"
                      }`}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        delay: waveDelay + 0.3,
                      }}
                    >
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
                      <div className={`${isGrid ? "w-full" : "flex-1"}`}>
                        <motion.h3
                          layout
                          className={`${
                            isGrid
                              ? "lg:text-xl xl:text-2xl font-semibold"
                              : "lg:text-xl xl:text-2xl font-semibold"
                          } text-gray-800 dark:text-[#d2e5f5]`}
                        >
                          <span>{item.name}</span>
                        </motion.h3>
                        <motion.p
                          layout
                          className="text-black mt-1 line-clamp-2"
                        >
                          <span>{item.description}</span>
                        </motion.p>

                        <motion.p
                          layout
                          className="text-black mt-1 flex text-sm items-start gap-1 "
                        >
                          <CustomLocation />
                          <span className="flex-1 line-clamp-1">
                            {item.location}
                          </span>
                        </motion.p>
                        <motion.div
                          layout
                          className="border-[1px] my-2 border-gray-300"
                        ></motion.div>
                        <motion.button
                          layout
                          className="px-4 py-2 flex justify-between items-center gap-4 w-full rounded-lg"
                        >
                          <div className="flex flex-col items-center">
                            <CustomMileage />
                            <p className="">{item?.mileage}</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <CustomPetrol />
                            <p className="">{item?.fuelType}</p>
                          </div>

                          <div className="flex flex-col items-center">
                            <CustomTransmission />
                            <p className="">{item?.transmission}</p>
                          </div>
                        </motion.button>
                        <motion.div
                          layout
                          className="border-[1px] my-2 border-gray-300"
                        ></motion.div>
                        <motion.div layout className="flex justify-between">
                          <motion.p
                            layout
                            className={`${
                              isGrid ? "text-xl" : "text-[1.1rem]"
                            } font-semibold text-gray-900 text-center`}
                            translate="no"
                          >
                            <span>€</span><span>{item?.price}</span>
                          </motion.p>
                          <Link to={`/details/${item?.id}`}>
                            <motion.p
                              layout
                              className={`${
                                isGrid ? "" : ""
                              } flex items-center gap-1 font-semibold text-gray-900 text-center hover:text-blue-500 transition-all duration-300 ease-in-out `}
                            >
                              View Details <ArrowUpRight size={20} />
                            </motion.p>
                          </Link>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListing;
