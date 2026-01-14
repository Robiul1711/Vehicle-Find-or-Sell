import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import "swiper/css/navigation";
import Title from "@/components/common/Title";
import { PdfIcon } from "@/components/common/SVGicons/DashboardIcon";
import { useLocation } from "react-router-dom";
import { Image } from "antd";
import { IMG_URL } from "@/config/constant";

const CarLeftSideImages = ({ data, isLoading }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const location = useLocation();

  // 1. Loading State (Skeleton)
  if (isLoading) {
    return (
      <div className="w-full flex flex-col h-full animate-pulse">
        <div className="w-full h-[550px] bg-gray-200 rounded-xl" />
        <div className="flex gap-3 mt-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="md:w-28 w-24 md:h-20 h-20 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-between h-full">
      <div>
        {/* Main Image with Centered Preview */}
        <div className="rounded-xl overflow-hidden relative group">
          <Image
            width="100%" // Changed to 100% for responsiveness
            height={550}
            preview={{
              mask: <div className="flex items-center justify-center h-full w-full">Preview</div>
            }}
            src={IMG_URL + data?.media?.image?.[selectedIndex]?.file}
            alt="Car"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Thumbnails Swiper */}
        <div className="mt-5">
          <Swiper
            spaceBetween={12}
            slidesPerView={"auto"} // Allows custom widths for slides
            className="pb-2"
          >
            {data?.media?.image?.map((img, idx) => (
              <SwiperSlide key={idx} className="!w-auto">
                <img
                  src={IMG_URL + img?.file}
                  onClick={() => setSelectedIndex(idx)}
                  className={`md:w-28 w-24 md:h-24 h-20 rounded-lg cursor-pointer object-cover border-2 transition ${
                    selectedIndex === idx
                      ? "border-blue-500 shadow-md"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  alt={`Car Thumbnail ${idx + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {location.pathname.startsWith("/dashboard/car-details/") && data?.registration?.document && (
        <div className="mt-8">
          <Title level="title20" className="mb-4">
            Document
          </Title>
          <a 
            href={data?.registration?.document} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 text-custom-primary bg-custom-primary/10 py-2 px-4 rounded-lg inline-flex hover:bg-custom-primary/20 transition"
          >
            <PdfIcon />
            Car-Brochure.pdf
          </a>
        </div>
      )}
    </div>
  );
};

export default CarLeftSideImages;