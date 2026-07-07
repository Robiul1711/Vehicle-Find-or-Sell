import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";
import banner from "@/assets/images/showroom1.png";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";
import { useApiQuery } from "@/hooks/useApiQuery";

const Banner = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);
  const mobileVideoRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const videos = [videoRef.current, mobileVideoRef.current].filter(Boolean);
    videos.forEach((video) => {
      video.muted = isMuted;
      video.volume = volume;
      if (isPlaying) {
        video.play().catch(() => {
          // Autoplay might be blocked by browser if not muted or without user interaction
          setIsPlaying(false);
        });
      } else {
        video.pause();
      }
    });
  }, [isMuted, isPlaying, volume]);

  const handleVolumeChange = (e) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (value > 0) {
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted && volume === 0) {
      setVolume(1);
    }
  };

  const { data, isLoading } = useApiQuery({
    queryKey: ["home"],
    url: "cms/home/",
  });

  const BannerData = data?.data;
  // console.log(BannerData)

  if (isLoading) {
    return (
      <section className="w-full relative bg-white overflow-hidden h-screen">
        {/* Desktop layout skeleton */}
        <div className="hidden md:flex flex-row md:gap-6 justify-between items-center section-padding-x section-padding-y">
          {/* Left Content Skeleton */}
          <div className="w-1/2 flex flex-col justify-center space-y-6 text-left animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-2/3"></div>
            <div className="space-y-3">
              <div className="h-14 bg-gray-200 rounded w-full"></div>
              <div className="h-14 bg-gray-200 rounded w-4/5"></div>
            </div>
            <div className="flex gap-4 pt-2">
              <div className="h-12 bg-gray-200 rounded w-36"></div>
              <div className="h-12 bg-gray-200 rounded w-36"></div>
            </div>
          </div>

          {/* Right Content Skeleton */}
          <div className="w-1/2 flex justify-end">
            <div className="w-full h-64 lg:h-96 xl:h-[450px] bg-gray-200 animate-pulse rounded-xl"></div>
          </div>
        </div>

        {/* Mobile layout skeleton */}
        <div className="md:hidden relative w-full h-[400px] flex items-center justify-center p-6 bg-gray-100 animate-pulse">
          <div className="w-full max-w-sm space-y-6 text-center">
            <div className="h-5 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="space-y-3">
              <div className="h-10 bg-gray-200 rounded w-full"></div>
              <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
            <div className="flex gap-3 justify-center pt-2">
              <div className="h-11 bg-gray-200 rounded w-28"></div>
              <div className="h-11 bg-gray-200 rounded w-28"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full relative bg-white overflow-hidden ">
      {/* Desktop layout */}
      <div className="hidden md:flex flex-row md:gap-6 justify-between items-center section-padding-x section-padding-y">
        {/* Left Content */}
        <div className="w-1/2 flex flex-col justify-center space-y-4 text-left">
          <p
            className="text-lg font-medium text-gray-600 dark:text-gray-300"
            dangerouslySetInnerHTML={{
              __html:
                BannerData?.subtitle ||
                "Buy or sell vehicles today – fast, simple, trusted.",
            }}
          />

          <div>
            <Title level="title70" className="max-w-[750px]">
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    BannerData?.title ||
                    "Find or Sell Your Vehicle Fast & Easy!",
                }}
              />
            </Title>
          </div>

          <div className="flex gap-4">
            <CommonButton
              link="/dashboard/create-ads"
              // variant="primary"
              className="flex items-center gap-2 rounded-lg border border-[#E69500] bg-[#FFA500] text-white transition-all duration-300 hover:bg-[#E69500] hover:border-[#CC8400] hover:text-white hover:scale-105 active:scale-95"
            >
              Post Your Ads <MdOutlineArrowOutward />
            </CommonButton>
            <CommonButton
              link={"/listings"}
              // variant="primary"
              className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 bg-transparent border-[1px] border-primary text-primary "
            >
              Browse Listings <MdOutlineArrowOutward />
            </CommonButton>
          </div>
        </div>

        {/* Right Content - Media */}
        <div className="w-1/2 flex justify-end min-h-[300px]">
          {BannerData?.hero_media_type === "video" && !isMobile ? (
            <div className="relative group w-full flex justify-end">
              <video
                ref={videoRef}
                src={BannerData?.hero_background_image_url}
                loop
                autoPlay
                playsInline
                muted={isMuted}
                className="w-full h-auto max-h-[300px] lg:max-h-[500px] xl:max-h-[600px] object-fill rounded-xl cursor-pointer"
                onClick={togglePlay}
              />
              <div className="absolute bottom-4 right-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-md p-2 rounded-full">
                <div className="flex items-center gap-2 px-2">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-primary transition-colors"
                  >
                    {isMuted || volume === 0 ? (
                      <FaVolumeMute />
                    ) : (
                      <FaVolumeUp />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>
                <div className="w-[1px] h-4 bg-white/20"></div>
                <button
                  onClick={togglePlay}
                  className="p-2 text-white hover:text-primary transition-colors"
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
              </div>
            </div>
          ) : (
            <img
              src={BannerData?.hero_background_image_url || banner}
              alt="Car banner"
              className="w-full h-auto max-h-[300px] lg:max-h-[500px] xl:max-h-[600px] object-cover rounded-xl shadow-2xl transition-all duration-700"
            />
          )}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden relative w-full h-[400px] flex items-center justify-center">
        {/* Blurred Background */}
        {BannerData?.hero_media_type === "video" && isMobile ? (
          <div className="absolute inset-0 w-full h-full">
            <video
              ref={mobileVideoRef}
              src={BannerData?.hero_background_image_url}
              loop
              autoPlay
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
              style={{ transform: "scale(1.1)" }}
              onClick={togglePlay}
            />
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md p-1.5 rounded-full">
              <button onClick={toggleMute} className="text-white p-1">
                {isMuted || volume === 0 ? (
                  <FaVolumeMute size={14} />
                ) : (
                  <FaVolumeUp size={14} />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <div className="w-[1px] h-3 bg-white/20"></div>
              <button onClick={togglePlay} className="text-white p-1">
                {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
              </button>
            </div>
          </div>
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
          <p
            className="text-white text-lg font-medium mb-2"
            dangerouslySetInnerHTML={{
              __html:
                BannerData?.subtitle ||
                "Buy or sell vehicles today – fast, simple, trusted.",
            }}
          />
          <div>
            <Title level="title40" className="text-white mb-4">
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    BannerData?.title ||
                    "Find or Sell Your Vehicle Fast & Easy!",
                }}
              />
            </Title>
          </div>
          <div className="flex gap-2 sm:flex-row justify-center">
            <CommonButton
              link="/dashboard/create-ads"
              variant="primary"
              className="flex items-center gap-1 justify-center border border-white text-white"
            >
              Post Your Ad <MdOutlineArrowOutward />
            </CommonButton>
            <CommonButton
              link="/listings"
              className="flex items-center gap-1 justify-center border-white text-white"
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
