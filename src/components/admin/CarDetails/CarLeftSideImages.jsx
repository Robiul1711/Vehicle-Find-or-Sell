import React, { useState, useMemo, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Title from "@/components/common/Title";
import { PdfIcon } from "@/components/common/SVGicons/DashboardIcon";
import { useLocation } from "react-router-dom";
import { Image, Modal } from "antd";
import { LeftOutlined, RightOutlined, PlayCircleOutlined } from "@ant-design/icons";

const CarLeftSideImages = ({ data, isLoading }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const videoRef = useRef(null);
  const location = useLocation();

  // Combine images and videos into a single media list
  const mediaList = useMemo(() => {
    const images = data?.media?.image ?? [];
    const videos = data?.media?.video ?? [];
    return [
      ...images.map((img) => ({ ...img, file_type: "image" })),
      ...videos.map((vid) => ({ ...vid, file_type: "video" })),
    ];
  }, [data]);

  const currentMedia = mediaList[selectedIndex];
  const isVideo = currentMedia?.file_type === "video";

  // Pause video when modal opens/closes or index changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [selectedIndex, isPreviewOpen]);

  const openPreview = () => {
    if (mediaList.length) setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  const goPrev = () => {
    if (!mediaList.length) return;
    setSelectedIndex(
      (prev) => (prev - 1 + mediaList.length) % mediaList.length,
    );
  };

  const goNext = () => {
    if (!mediaList.length) return;
    setSelectedIndex((prev) => (prev + 1) % mediaList.length);
  };

  if (isLoading) {
    return (
      <div className="w-full flex flex-col h-full animate-pulse">
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] bg-gray-200 rounded-xl" />
        <div className="flex gap-3 mt-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="md:w-28 w-24 md:h-24 h-20 bg-gray-200 rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-between h-full">
      <div>
        {/* Main Media Display */}
        <div
          className="rounded-xl overflow-hidden relative group bg-black/5"
          onClick={isVideo ? undefined : openPreview}
        >
          {isVideo ? (
            <video
              ref={videoRef}
              src={currentMedia?.file}
              controls
              playsInline
              className="w-full !h-[300px] sm:!h-[400px] md:!h-[500px] lg:!h-[550px] object-contain rounded-xl bg-black"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <>
              <Image
                width="100%"
                preview={false}
                src={currentMedia?.file}
                alt="Car"
                className="w-full !h-[300px] sm:!h-[400px] md:!h-[500px] lg:!h-[550px] object-cover rounded-xl"
              />
              <div
                className="absolute inset-0 flex items-center justify-center text-white bg-black/25 opacity-0 group-hover:opacity-100 transition"
                onClick={openPreview}
              >
                <span className="px-4 py-2 bg-black/50 rounded">
                  Click to preview
                </span>
              </div>
            </>
          )}
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
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
              onClick={goPrev}
              aria-label="Previous"
            >
              <LeftOutlined className="text-xl sm:text-3xl" />
            </button>

            {mediaList[selectedIndex]?.file_type === "video" ? (
              <video
                src={mediaList[selectedIndex]?.file}
                controls
                playsInline
                autoPlay
                className="max-h-[80vh] max-w-full object-contain rounded-lg"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={mediaList[selectedIndex]?.file}
                alt={`Preview ${selectedIndex + 1}`}
                className="max-h-[80vh] max-w-full object-contain"
              />
            )}

            <button
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
              onClick={goNext}
              aria-label="Next"
            >
              <RightOutlined className="text-xl sm:text-3xl" />
            </button>
          </div>
        </Modal>

        {/* Thumbnails Swiper */}
        <div className="mt-5">
          <Swiper
            spaceBetween={12}
            slidesPerView={"auto"}
            className="pb-2"
          >
            {mediaList.map((item, idx) => (
              <SwiperSlide key={idx} className="!w-auto">
                <div
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedIndex(idx)}
                >
                  {item.file_type === "video" ? (
                    <>
                      <div className="relative md:w-28 w-24 md:h-24 h-20 rounded-lg overflow-hidden bg-gray-900">
                        <img
                          src={item?.thumbnail || item?.file}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                          className={`w-full h-full object-cover border-2 transition ${
                            selectedIndex === idx
                              ? "border-blue-500 shadow-md"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                          alt={`Thumbnail ${idx + 1}`}
                        />
                        {/* Play icon overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div
                            className={`flex items-center justify-center w-10 h-10 rounded-full bg-black/60 text-white backdrop-blur-sm transition-transform group-hover:scale-110 ${
                              selectedIndex === idx
                                ? "bg-blue-600/80 scale-110"
                                : ""
                            }`}
                          >
                            <PlayCircleOutlined className="text-xl" />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <img
                      src={item?.file}
                      className={`md:w-28 w-24 md:h-24 h-20 rounded-lg cursor-pointer object-cover border-2 transition ${
                        selectedIndex === idx
                          ? "border-blue-500 shadow-md"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      alt={`Thumbnail ${idx + 1}`}
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {location.pathname.startsWith("/dashboard/car-details/") &&
        data?.registration?.document && (
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
