import { useState } from "react";
import { motion } from "framer-motion";
import { ImageProvider } from "@/utils/ImageProvider";
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import { ArrowUpRight, ChevronDown, Search } from "lucide-react";
import {
  CustomLocation,
  CustomMileage,
  CustomPetrol,
  CustomTransmission,
} from "@/utils/IconProvider";
import { Link, useParams } from "react-router-dom";
import { useApiQuery } from "@/hooks/useApiQuery";


const options = ["car", "motorcycle", "truck", "scooter", "parts"];

const DealerProfileListing = () => {
  const { id } = useParams();
  const [type, setType] = useState("car");
  const [search, setSearch] = useState("");
  const [isGrid, setIsGrid] = useState(true);
  const [isFeatureModal, setIsFeatureModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("car");

  const { data: adsData, isLoading } = useApiQuery({
    queryKey: ["dealerListing", id, type, search],
    url: `/delears/listing/${id}/`,
    secure: true,
    params: {
      type: type,
      search: search || undefined,
    },
  });
// console.log(adsData);
  // Determine item type correctly from results
  const items =
    adsData?.data?.map((item) => ({
      ...item,
      itemType: item.part_name ? "part" : "vehicle",
    })) || [];

  const handleSelect = (option) => {
    setType(option);
    setSelectedOption(option);
    setIsFeatureModal(false);
  };

  return (
    <div className="w-full space-y-8">
      {/* Header Filters Section */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-custom-primary/20 focus:border-custom-primary outline-none transition-all text-sm"
            placeholder="Search within this dealer's inventory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Category Selector */}
          <div className="relative flex-1 md:flex-none">
            <button
              onClick={() => setIsFeatureModal((prev) => !prev)}
              className="w-full md:w-48 flex items-center justify-between px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-custom-primary transition-colors text-sm"
            >
              <span className="text-gray-500 mr-2">Category:</span>
              <span className="font-semibold text-gray-900 capitalize">
                {selectedOption}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${isFeatureModal ? "rotate-180" : ""}`}
              />
            </button>

            {isFeatureModal && (
              <div className="absolute top-full mt-2 left-0 right-0 md:left-auto md:w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-2 overflow-hidden">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 capitalize ${
                      selectedOption === option
                        ? "text-custom-primary font-bold bg-custom-primary/5"
                        : "text-gray-700"
                    }`}
                  >
                    {option === "parts" ? "Auto Parts" : option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* View Toggles */}
          <div className="flex items-center p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setIsGrid(true)}
              className={`p-2 rounded-lg transition-all ${isGrid ? "bg-white text-custom-primary shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              <IoGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsGrid(false)}
              className={`p-2 rounded-lg transition-all ${!isGrid ? "bg-white text-custom-primary shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              <FaList className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div
              key={n}
              className="bg-white rounded-2xl h-[400px] animate-pulse border border-gray-100"
            >
              <div className="h-48 bg-gray-200 rounded-t-2xl mb-4" />
              <div className="px-4 space-y-3">
                <div className="h-6 bg-gray-200 w-3/4 rounded" />
                <div className="h-4 bg-gray-200 w-full rounded" />
                <div className="h-10 bg-gray-100 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length > 0 ? (
        <div
          className={`${
            isGrid
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-6 "
          }`}
        >
          {items.map((item, i) => {
            const isPartItem = item.itemType === "part";
            return (
              <motion.div
                key={item.id + item.itemType}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden ${
                  !isGrid ? "flex flex-col sm:flex-row" : ""
                }`}
              >
                {/* Image Container */}
                <div
                  className={`relative overflow-hidden ${!isGrid ? "sm:w-56" : "w-full h-52 text-center"}`}
                >
                  <img
                    src={
                      item.first_image
                        ? item.first_image.startsWith("http")
                          ? item.first_image
                          : item.first_image
                        : ImageProvider.car1
                    }
                    alt={
                      isPartItem
                        ? item.part_name
                        : `${item.brand_name} ${item.model}`
                    }
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-custom-primary shadow-sm border border-white">
                      {isPartItem ? "Part" : type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-custom-primary transition-colors line-clamp-1 mb-1">
                      {isPartItem
                        ? item.part_name
                        : `${item.brand_name} ${item.model}`}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">
                      {isPartItem ? item.description : item.body || item.model}
                    </p>

                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                      <CustomLocation className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">
                        {item.seller_address || "Address N/A"}
                      </span>
                    </div>

                    {/* Specs Grid */}
                    <div className="bg-gray-50 rounded-xl p-3 flex justify-between items-center gap-2 mb-5">
                      <div className="flex flex-col items-center">
                        <CustomMileage className="w-4 h-4 text-gray-400 mb-1" />
                        <span className="text-[10px] text-gray-600 font-medium">
                          {isPartItem
                            ? item.warrenty_duration || "N/A"
                            : item.mileage || "N/A"}
                        </span>
                      </div>
                      <div className="w-px h-8 bg-gray-200" />
                      <div className="flex flex-col items-center">
                        <CustomPetrol className="w-4 h-4 text-gray-400 mb-1" />
                        <span className="text-[10px] text-gray-600 font-medium lowercase">
                          {isPartItem
                            ? item.weight || "N/A"
                            : item.fuel_type || "N/A"}
                        </span>
                      </div>
                      <div className="w-px h-8 bg-gray-200" />
                      <div className="flex flex-col items-center">
                        <CustomTransmission className="w-4 h-4 text-gray-400 mb-1" />
                        <span className="text-[10px] text-gray-600 font-medium">
                          {isPartItem
                            ? item.material || "N/A"
                            : item.transmission || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xl font-black text-gray-950">
                      €{item.discount_price || item.original_price || "0"}
                    </span>
                    <Link
                      to={
                        isPartItem
                          ? `/parts-details/${item.id}/${item.slug}`
                          : `/details/${item.id}/${item.slug}`
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 bg-custom-primary text-white rounded-lg text-sm font-bold hover:bg-custom-primary/90 transition-all active:scale-95 shadow-lg shadow-custom-primary/20"
                    >
                      View <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No listings found
          </h3>
          <p className="text-gray-500 text-center max-w-xs px-4">
            This dealer doesn't have any items matching your criteria at the
            moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default DealerProfileListing;
