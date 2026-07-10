import React, { useState } from "react";
import { ArrowUpRight, Loader } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Title from "../common/Title";
import Tabs from "../common/Tabs";

import { bikes, cars, Parts, Scoter, trucks } from "@/lib/cardata";
import VehiclesCardDemo from "../common/VehiclesCardDemo";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useApiMutation } from "@/hooks/useApiMutation";
import { Link } from "react-router-dom";
import PaginationComponent from "../common/PaginationComponent";

const FeaturedListings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("car");
  const { data, isLoading, refetch } = useApiQuery({
    queryKey: ["store-filter", activeTab, currentPage],
    url: "/store/filter/",
    params: {
      type: activeTab,
      page: currentPage,
    },
    secure: true,
  });
  // console.log(data?.data)
  // add favorite
  const { mutate, isPending } = useApiMutation({
    url: "/account/favorites/toggle/",
    method: "POST",
    secure: true,
    successMessage: "Toggle favorite success!",
    onSuccess: () => {
      refetch();
    },
  });

  const onAddFavorite = (id, type) => {
    mutate({ id, type });
  };

  const getMappedData = () => {
    if (!data?.data) return [];

    if (activeTab === "parts") {
      return data.data.map((item) => ({
        id: item.id,
        slug:item.slug,
        imageUrl: item.first_image,
        title: item.part_name,
        subtitle: item.brand_name,
        mileage: item.warrenty_duration,
        fuelType: item.weight,
        transmission: item.material,
        originalPrice: item.original_price,
        discountPrice: item.discount_price,
        isNew: false,
        isFavorite: item.is_favourite,
        isVideo: item.is_video,
        isBumped: item.is_bumped,
      }));
    } else {
      return data.data.map((item) => ({
        id: item.id,
        slug:item.slug,
        imageUrl: item.first_image,
        title: `${item.brand_name} ${item.model}`,
        subtitle: item.seller_address && item.seller_address.replace(/[,\s]+/g, "") !== "" ? item.seller_address : "",
        mileage: item.mileage,
        fuelType: item.fuel_type,
        transmission: item.transmission,
        originalPrice: item.original_price,
        discountPrice: item.discount_price,
        isNew: false,
        isFavorite: item.is_favourite,
        isVideo: item.is_video,
        isBumped: item.is_bumped,
      }));
    }
  };

  const currentData = getMappedData();

  /* Helper to render content based on state */
  const renderTabContent = (type = "vehicle") => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-20 min-h-[400px]">
          <Loader className="animate-spin text-custom-primary" size={32} />
        </div>
      );
    }

    if (!currentData || currentData.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100 min-h-[400px]"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
            <svg
              className="w-8 h-8 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            No {type === "part" ? "parts" : "vehicles"} available
          </h3>
          <p className="text-gray-400 mt-2 max-w-xs mx-auto">
            Check back later for new listings or try a different category.
          </p>
        </motion.div>
      );
    }

    return (
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <VehiclesCardDemo
          cars={currentData}
          path={type === "part" ? "parts-details" : undefined}
          onAddFavorite={onAddFavorite}
          type={type}
        />
      </motion.div>
    );
  };

  const tabData = [
    {
      id: "car",
      name: "Cars",
      content: renderTabContent("vehicle"),
    },
    {
      id: "motorcycle",
      name: "Motorcycle",
      content: renderTabContent("vehicle"),
    },
    {
      id: "truck",
      name: "Utility Trucks",
      content: renderTabContent("vehicle"),
    },
    {
      id: "scooter",
      name: "Scooter",
      content: renderTabContent("vehicle"),
    },
    {
      id: "parts",
      name: "Parts",
      content: renderTabContent("part"),
    },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <section id="featured-listings" className="section-padding-x  bg-[#F9FAFB] py-10 md:py-14 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center"
      >
        <div>
          <Title level="title40">Featured Listings</Title>
          <Title level="title18" className="mt-4 text-gray-500">
            Presentation of the most recent and popular advertisements on the platform.
            {/* Showcasing the latest and most popular ads on the platform. */}
          </Title>
        </div>
        <Link
          to="/listings"
          className="text-custom-primary font-semibold flex items-center gap-2"
        >
          View All
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-5 md:mt-10"
      >
        <Tabs
          items={tabData}
          activeTab={activeTab}
          onChange={handleTabChange}
        />
      </motion.div>
      {data?.count > 12 && (
        <div className="mt-8 flex justify-center ">
          <PaginationComponent
            pageCount={Math.ceil((data?.count || 0) / 12)}
            setPageCount={setCurrentPage}
            forcePage={currentPage}
            scrollContainerId="featured-listings"
          />
        </div>
      )}
    </section>
  );
};

export default FeaturedListings;
