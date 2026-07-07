import React, { useState, useMemo, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Title from "@/components/common/Title";
import { PdfIcon } from "@/components/common/SVGicons/DashboardIcon";
import { useLocation } from "react-router-dom";
import { Image, Modal } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";

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

  // Filter only images for Ant Design Image.PreviewGroup
  const imageMediaList = useMemo(() => {
    return mediaList.filter((item) => item.file_type === "image");
  }, [mediaList]);

  // Find current index in image list
  const currentImageIndex = useMemo(() => {
    if (!currentMedia || currentMedia.file_type !== "image") return 0;
    const index = imageMediaList.findIndex((img) => img.file === currentMedia.file);
    return index !== -1 ? index : 0;
  }, [currentMedia, imageMediaList]);

  const handlePreviewChange = (newImageIndex) => {
    const targetImage = imageMediaList[newImageIndex];
    if (targetImage) {
      const mainIndex = mediaList.findIndex((item) => item.file === targetImage.file);
      if (mainIndex !== -1) {
        setSelectedIndex(mainIndex);
      }
    }
  };

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
        <div className="rounded-xl overflow-hidden relative">
          {isVideo ? (
            <video
              ref={videoRef}
              src={currentMedia?.file}
              controls
              playsInline
              className="w-full aspect-[16/10] object-contain rounded-xl bg-black"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="relative group overflow-hidden rounded-xl">
              <Image.PreviewGroup
                preview={{
                  visible: isPreviewOpen,
                  onVisibleChange: (visible) => setIsPreviewOpen(visible),
                  current: currentImageIndex,
                  onChange: (newIndex) => handlePreviewChange(newIndex),
                }}
              >
                {imageMediaList.map((item, idx) => (
                  <div key={idx} className={idx === currentImageIndex ? "block" : "hidden"}>
                    <Image
                      src={item.file}
                      alt={`Car ${idx + 1}`}
                      className="w-full aspect-[16/10] object-fit rounded-xl"
                      preview={{
                        mask: (
                          <div className="absolute inset-0 flex items-center justify-center text-white bg-black/25 opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer">
                            <span className="px-4 py-2 bg-black/70 rounded-xl text-sm font-semibold tracking-wide backdrop-blur-sm">
                              Click to Zoom & View
                            </span>
                          </div>
                        ),
                      }}
                    />
                  </div>
                ))}
              </Image.PreviewGroup>
            </div>
          )}
        </div>

        {/* Thumbnails Swiper */}
        <div className="mt-5">
          <Swiper spaceBetween={12} slidesPerView={"auto"} className="pb-2">
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
