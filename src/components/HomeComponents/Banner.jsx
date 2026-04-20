import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import banner from "@/assets/images/banner.png";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";
import { useApiQuery } from "@/hooks/useApiQuery";

const Banner = () => {
  const { data, isLoading } = useApiQuery({
    queryKey: ["home"],
    url: "cms/home/",
  });

  const BannerData = data?.data;

  return (
    <section className="w-full relative bg-white overflow-hidden">
      {/* Desktop layout */}
      <div className="hidden md:flex flex-row justify-between items-center section-padding-x section-padding-y">
        {/* Left Content */}
        <div className="w-1/2 flex flex-col justify-center space-y-6 text-left">
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
            {BannerData?.subtitle || "Buy or sell vehicles today – fast, simple, trusted."}
          </p>

          <div>
            <Title level="title70" className="max-w-[750px]">
              {BannerData?.title || "Find or Sell Your Vehicle Fast & Easy!"}
            </Title>
          </div>

          <div className="flex gap-4">
            <CommonButton
              link="/dashboard/create-ads"
              variant="primary"
              className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
            >
              Post Your Ads <MdOutlineArrowOutward />
            </CommonButton>
            <CommonButton
              link={"/listings"}
              variant="primary"
              className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
            >
              Browse Listings <MdOutlineArrowOutward />
            </CommonButton>
          </div>
        </div>

        {/* Right Content - Media with Loading State */}
        <div className="w-1/2 flex justify-end min-h-[300px]">
          {isLoading ? (
            <div className="w-full h-64 lg:h-96 xl:h-110 bg-gray-200 animate-pulse rounded-xl"></div>
          ) : BannerData?.hero_media_type === "video" ? (
            <video
              src={BannerData?.hero_background_image_url}
              autoPlay
              loop
              muted
              playsInline
              className="w-full max-w-full object-contain rounded-xl"
            />
          ) : (
            <img
              src={BannerData?.hero_background_image_url || banner}
              alt="Car banner"
              className="w-full max-w-full object-contain"
            />
          )}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden relative w-full h-[400px] flex items-center justify-center">
        {/* Blurred Background with Loading State */}
        {isLoading ? (
          <div className="absolute inset-0 bg-gray-300 "></div>
        ) : BannerData?.hero_media_type === "video" ? (
          <video
            src={BannerData?.hero_background_image_url}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "blur(2px)", transform: "scale(1.1)" }}
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${BannerData?.hero_background_image_url || banner})`,
              filter: "blur(4px)",
              transform: "scale(1.1)",
            }}
          ></div>
        )}

        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Text content */}
        <div className="relative z-10 text-center px-4">
          <p className="text-white text-lg font-medium mb-2">
            {BannerData?.subtitle || "Buy or sell vehicles today – fast, simple, trusted."}
          </p>
          <div>
            <Title level="title40" className="text-white mb-4">
              {BannerData?.title || "Find or Sell Your Vehicle Fast & Easy!"}
            </Title>
          </div>
          <div className="flex gap-3 sm:flex-row justify-center">
            <CommonButton
              link="/dashboard/create-ads"
              variant="primary"
              className="flex items-center gap-2 justify-center border border-white text-white"
            >
              Post Your Ad <MdOutlineArrowOutward />
            </CommonButton>
            <CommonButton
              link="/listings"
              className="flex items-center gap-2 justify-center border-white text-white"
            >
              Browse Listings <MdOutlineArrowOutward />
            </CommonButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;