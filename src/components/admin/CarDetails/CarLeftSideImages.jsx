import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import "swiper/css/navigation";
import Title from "@/components/common/Title";
import { PdfIcon } from "@/components/common/SVGicons/DashboardIcon";
import { useLocation } from "react-router-dom";
import { Image, Modal } from "antd";
import { LeftOutlined, RightOutlined, CloseOutlined } from "@ant-design/icons";

const CarLeftSideImages = ({ data, isLoading }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const location = useLocation();

  const imageList = data?.media?.image ?? [];

  const openPreview = () => {
    if (imageList.length) setIsPreviewOpen(true);
  };

  const closePreview = () => setIsPreviewOpen(false);

  const goPrev = () => {
    if (!imageList.length) return;
    setSelectedIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const goNext = () => {
    if (!imageList.length) return;
    setSelectedIndex((prev) => (prev + 1) % imageList.length);
  };


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
        {/* Main Image with Custom Preview (with arrows) */}
        <div className="rounded-xl overflow-hidden relative group cursor-pointer" onClick={openPreview}>
          <Image
            width="100%"
            height={550}
            preview={false}
            src={imageList[selectedIndex]?.file}
            alt="Car"
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute inset-0 flex items-center justify-center text-white bg-black/25 opacity-0 group-hover:opacity-100 transition">
            <span className="px-4 py-2 bg-black/50 rounded">Click to preview</span>
          </div>
        </div>

        <Modal
          open={isPreviewOpen}
          onCancel={closePreview}
          footer={null}
          centered
          width="80%"
        >
          <div className="relative flex items-center justify-center h-[80vh]">
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={goPrev}
              aria-label="Previous Image"
            >
              <LeftOutlined className="text-3xl"/>
            </button>

            <img
              src={imageList[selectedIndex]?.file}
              alt={`Car Preview ${selectedIndex + 1}`}
              className="max-h-[80vh] max-w-full object-contain"
            />

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={goNext}
              aria-label="Next Image"
            >
              <RightOutlined className="text-3xl"/>
            </button>
          </div>
        </Modal>

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
                  src={img?.file}
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
            className="inline-flex items-center gap-2 text-custom-primary bg-custom-primary/10 py-2 px-4 rounded-lg hover:bg-custom-primary/20 transition"
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